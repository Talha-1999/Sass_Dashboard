import React, { useEffect, useState } from "react";
import { Button, Card, Select } from "antd";
import grapesjs from "grapesjs";
import gjsPresentWebpage from "grapesjs-preset-webpage";
import gjsBlockBasic from "grapesjs-blocks-basic";
import axios from "axios";
import { AUTH_TOKEN } from "redux/constants/Auth";
import { loadSelectedTheme } from "redux/actions/Profile";
import { connect, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_URL } from "redux/store/baseUrl";
import en, { english } from "lang/locales/en";
import LZUTF8 from "lzutf8";
const { Option } = Select;

const decompressHtml = (htmString) => {
  do {
    htmString = LZUTF8.decompress(htmString, { inputEncoding: "StorageBinaryString", outputEncoding: "String" })
  } while (!htmString.includes('<html>'))
  return htmString
}

function CreatePage() {
  const [editor, setEditor] = useState(null);
  const [themeScripts, setThemeScripts] = useState([]);
  const [themeCss, setThemeCss] = useState([]);
  const [themeHtml, setThemeHtml] = useState([]);
  const [pages, setPages] = useState([]);
  const params = useParams();
  const [isNewProfie, setIsNewProfile] = useState(false);
  const [userName, setUserName] = useState({});
  const [language, setLanguage] = useState({
    locale: "en",
    localeFallback: "en",
    messages: { english },
  });
  const [isLoading, setIsLoading] = useState(true);

  const lang = useSelector((state) => state.theme.locale);

  useEffect(() => {
    const languageChange = () => {
      if (lang == "zh") {
        setLanguage({
          ...language,
          messages: { en },
        });
      }
    };
    languageChange();
  }, [lang]);

  const withScripts = (html, themeScripts) => {
    let temp = html.split("</body>");
    return `${temp[0]}
    ${themeScripts.map(
      (script) => `<script src="${script}"></script>`
    )}</body>${temp[1]}`;
  };

  useEffect(() => {
    axios
      .post(`${BASE_URL}/users/profile`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
        },
      })
      .then((res) => {
        console.log("get-user-profile", res);
        setUserName(res.data.fullName.replace(new RegExp(" ", "g"), ""));
        let selectedThemeId = localStorage.getItem("selected_theme_id");

        axios
          .post(
            `${BASE_URL}/users/get-user-profiles`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
              },
            }
          )
          .then((res) => {
            console.log("get-user-profiles", res);
            if (res.data[0]) {

              let htmString = decompressHtml(res.data[0].pages.find(
                (val) => val.name == params.pageName
              ).html)

              setThemeHtml(htmString)
              setPages(res.data[0].pages);
              setThemeCss(htmString.split("<style>")[1].split("<style/>")[0])

              setIsLoading(false);
            } else {
              setIsNewProfile(true);
              axios
                .post(
                  `${BASE_URL}/themes/get-string/${selectedThemeId}/${lang == "zh" ? "arabic" : "en"
                  }`,
                  {},
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem(
                        AUTH_TOKEN
                      )}`,
                    },
                  }
                )
                .then((res) => {
                  console.log("resss", res);
                  setThemeScripts(
                    res.data.scripts.map((val) =>
                      val.includes("https")
                        ? val
                        : `${BASE_URL}/${res.data.themeDir}/${val}`
                    )
                  );
                  setThemeHtml(
                    res.data.pages.filter(
                      (val) => val.name == params.pageName
                    )[0].html
                  );
                  setPages(res.data.pages);
                  setThemeCss(res.data.css);
                  setIsLoading(false);
                })
                .catch((error) => {
                  console.log("error", error);
                  setIsLoading(false);
                });
            }
          });
      });
  }, [language, lang, params.pageName]);

  useEffect(() => {
    const edit = grapesjs.init({
      container: "#editor",
      fromElement: true,
      width: "auto",
      selectorManager: false,
      plugins: [gjsPresentWebpage, gjsBlockBasic],
      pluginsOpts: {
        gjsPresentWebpage: {},
        gjsBlockBasic: {},
      },
      storageManager: {
        id: "gjs-",
        type: "local",
        autosave: false,
        storeComponents: false,
        storeStyles: false,
        storeHtml: false,
        storeCss: false,
      },
      deviceManager: {
        devices: [
          {
            id: "desktop",
            name: "Desktop",
            width: "",
          },
          {
            id: "tablet",
            name: "Tablet",
            width: "768px",
            widthMedia: "992px",
          },
          {
            id: "mobilePortrait",
            name: "Mobile portrait",
            width: "320px",
            widthMedia: "575px",
          },
        ],
      },
      i18n: {
        locale: language.locale, // default locale
        detectLocale: true, // by default, the editor will detect the language
        localeFallback: language.localeFallback, // default fallback
        messages: language.messages,
      },
      canvas: {
        scripts: themeScripts,
        css: themeCss,
      },
    });

    setEditor(edit);
  }, [themeScripts, themeCss, language]);

  useEffect(() => {
    if (editor) {
      editor.setComponents(themeHtml);
      editor.setStyle(themeCss);
    }

    // return () => editor.destroy()
  }, [editor, themeHtml, themeCss]);

  const onHandle = () => {
    const html = editor.getHtml();
    const css = editor.getCss();
    setIsLoading(true);
    axios
      .post(
        `${BASE_URL}/pages/add-user-profile`,
        {
          domainName: selectedDom,
          pages: pages.map((val) =>
            val.name == params.pageName
              ? {
                name: val.name,
                html: LZUTF8.compress(`
            <!DOCTYPE html>
            <html>
              <head>
              <title>${val.name}</title>
                <style>
                ${css}
                </style>
              </head>
              ${withScripts(
                  isNewProfie
                    ? html.replace(
                      new RegExp('href="', "g"),
                      `href="${selectedDom ? `http://www.${selectedDom}` : `${BASE_URL}/uploads/pageFiles/${userName}`}/`
                    )
                    : html,
                  themeScripts
                )}
            </html>
            `, { outputEncoding: "StorageBinaryString" }),
                css: "css1",
                path: "path1",
              }
              : isNewProfie
                ? {
                  name: val.name,
                  html: LZUTF8.compress(`
            <!DOCTYPE html>
            <html>
              <head>
              <title>${val.name}</title>
                <style>
                ${themeCss}
                </style>
              </head>
              ${withScripts(
                    val.html.replace(
                      new RegExp('href="', "g"),
                      `href="${selectedDom ? `http://www.${selectedDom}` : `${BASE_URL}/uploads/pageFiles/${userName}`}/`
                    ),
                    themeScripts
                  )}
            </html>
            `, { outputEncoding: "StorageBinaryString" }),
                  css: "css1",
                  path: "path1",
                }
                : {
                  name: val.name,
                  html: LZUTF8.compress(val.html, { outputEncoding: "StorageBinaryString" }),
                  css: "css1",
                  path: "path1",
                }
          ),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
          },
        }
      )
      .then((respone) => {
        let url = respone.data.pages.filter(
          (url) => url.name == params.pageName
        )[0].fileUrl;
        console.log("add-user-profile", selectedDom ? `http://www.${selectedDom}/${url.substring(url.lastIndexOf('/') + 1)}` : `${BASE_URL}/${url}`);
        setIsLoading(false);
        setIsNewProfile(false);
        window.open(selectedDom ? `http://www.${selectedDom}/${url.substring(url.lastIndexOf('/') + 1)}` : `${BASE_URL}/${url}`, "_blank");
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const onPreview = () => {
    window.open(
      `${selectedDom ? `http://www.${selectedDom}` : `${BASE_URL}/uploads/pageFiles/${userName}`}/${params.pageName == "home" ? "index" : params.pageName}.html`,
      "_blank"
    );
  };

  const [selectedDom, setSelectedDom] = useState('')

  const selectDomain = (e) => {
    console.log('askjdnasdas', e)
    setSelectedDom(e)
  }

  const [domainlist, setDomainList] = useState([])
  useEffect(() => {
    axios.post(`${BASE_URL}/domain/get-my-domains`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      }
    }).then((values) => {
      console.log("info", values);
      setDomainList(values.data)
    })
      .catch((info) => {
        console.log("error", info);
      });
  }, [])

  return (
    <>
      <Card className="calender mb-0">
        <Card>
          {" "}
          <Button type="primary" onClick={onHandle} loading={isLoading}>
            Publish
          </Button>
          {!isNewProfie ? <Button style={{ marginLeft: '10px' }} onClick={onPreview}>Preview</Button> : null}
          <Select placeholder={'Select domain'} style={{ marginLeft: '10px', width: 200 }} onChange={(e) => selectDomain(e)}>
            {domainlist.map((val) => <Option value={val.name}>{val.name}</Option>)}
          </Select>
        </Card>
        <div id="editor"></div>
        <div
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "200px",
          }}
        ></div>
      </Card>
    </>
  );
}

const mapStateToProps = ({ auth }) => {
  const { loading, message, showMessage, token, redirect } = auth;
  return { loading, message, showMessage, token, redirect };
};

const mapDispatchToProps = {
  loadSelectedTheme,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);
