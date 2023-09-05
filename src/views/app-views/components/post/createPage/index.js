import React, { useEffect, useState } from "react";
import { Button, Card } from "antd";
import grapesjs from "grapesjs";
import gjsPresentWebpage from "grapesjs-preset-webpage";
import gjsBlockBasic from "grapesjs-blocks-basic";
import { render } from "./createHtml";
import axios from "axios";
import { AUTH_TOKEN } from "redux/constants/Auth";
import { loadSelectedTheme } from "redux/actions/Profile";
import { connect } from "react-redux";
// import ar from 'grapesjs/src/i18n/locale/ar';

function CreatePage() {
  const [editor, setEditor] = useState(null);

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
    });

    setEditor(edit);
  }, []);

  useEffect(() => {
    // if (editor) {
    //     let selectedThemeId = localStorage.getItem('selected_theme_id')
    //     axios.get(`http://localhost:5000/htmlcss?selected_theme_id=${selectedThemeId}`).then((res) => {
    //         editor.setComponents(res.data.html);
    //         editor.setStyle(res.data.css);
    //     }).catch((error) => {
    //         console.log('error', error)
    //     })
    // }
    if (editor) {
      let selectedThemeId = localStorage.getItem("selected_theme_id");
      axios
        .post(
          `http://localhost:5001/themes/get-string/${selectedThemeId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
            },
          }
        )
        .then((res) => {
          editor.setComponents(res.data.html);
          editor.setStyle(res.data.css);
        })
        .catch((error) => {
          console.log("error", error);
        });
      //loadSelectedTheme()
    }
  }, [editor]);

  const onHandle = () => {
    // const data = editor.getHtml()
    // const sty = editor.Canvas.getDocument()
    // const grand = sty.getElementById('iju5')
    // editor.AssetManager.getAll() find image

    const html = editor.getHtml();
    const css = editor.getCss();

    axios
      .post(
        `http://localhost:5001/profile/add-user-profile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
          },
        },
        {
          profileData: [
            {
              name: "page1",
              html: "html1",
              css: "css1",
              path: "path1",
            },
            {
              name: "page2",
              html: "html2",
              css: "css2",
              path: "path2",
            },
          ],
        }
      )
      .then((respone) => {
        console.log("alskdmasld", respone);
      })
      .catch((err) => {
        console.log("errererer", err);
      });

    return render();
  };

  return (
    <>
      <Card className="calender mb-0">
        <div id="editor"></div>
        <Button type="primary" onClick={onHandle}>
          Submit
        </Button>
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

// import React, { useEffect } from 'react';
// import GrapesJS from 'grapesjs';

// function MyComponent() {
//   const containerRef = React.useRef(null);

//   useEffect(() => {
//     const editor = GrapesJS.init({
//       container: containerRef.current,
//       components: '',
//       plugins: ['gjs-preset-webpage']
//     });

//     // load the HTML file
//     fetch('path/to/file.html')
//       .then(response => response.text())
//       .then(html => {
//         editor.setComponents(html);
//       });
//   }, []);

//   return <div ref={containerRef} />;
// }

// export default MyComponent;
