import React, { useCallback, useEffect, useState } from "react";
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { postEditor } from "redux/actions/UserState";

const TOOLBAR = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"]
]

function Editor() {
    const dispatch = useDispatch()
    const [quill, setQuill] = useState();
    const [TexT, setText] = useState('')
    const [File, setFile] = useState([])
    const photo = []

    useEffect(() => {
        let data;
        let newStr;
        let index = 11;
        if (TexT.length) {
            if (TexT.length > index) {
                newStr = TexT.replace(/<img[^>]*>/g, "");
                data = { text: newStr, file: File }
                dispatch(postEditor(data))
            } else if (TexT.length <= 11) {
                newStr = TexT.replace(/<p><br[\/]?><[\/]?p>/g, "")
                data = { text: newStr, file: File }
                dispatch(postEditor(data))
            }
        }
    }, [TexT, File])

    
    useEffect(() => {
        if (quill == null) return

        const handler = (delta) => {
            const imagediv = document.getElementsByClassName('ql-editor')
            const text = imagediv[0].innerHTML
            setText(text)
        }
        
        quill.on('text-change', handler)

        return () => {
            quill.off('text-change', handler)
        }
    }, [quill])
    
    const imageHandler = () => {

        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = () => {
            const file = input.files[0];
            photo.push(file)
            setFile(photo)

            let image = URL.createObjectURL(file)
            const imagediv = document.getElementsByClassName('ql-editor')
            let newimg = document.createElement('img')
            newimg.style.width = '300px'
            newimg.src = image;
            imagediv[0].appendChild(newimg)

        };
    }

    useEffect(() => {
        if (File.length > 0) {
            document.addEventListener('keydown', (e) => {
                if (e.key == "Backspace") {
                    File.pop()
                }
            })
        }
    }, [File])


    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return

        wrapper.innerHTML = ""
        let editor = document.createElement("div")
        wrapper.append(editor)
        const q = new Quill(editor, { theme: 'snow', modules: { toolbar: { container: TOOLBAR, handlers: { image: imageHandler } } } })
        setQuill(q)


    }, [])

    return <div className="container" placeholder="Enter Here" style={{ height: '60vh' }} ref={wrapperRef}></div>



}
export default Editor