import React from "react";
import "./TextileEditor.css";
// Require Editor JS files.
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/js/third_party/embedly.min.js";
import "froala-editor/js/plugins/fullscreen.min.js";

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/third_party/embedly.min.css";
import "froala-editor/css/plugins/fullscreen.min.css";

import "font-awesome/css/font-awesome.min.css";

import Froala from "froala-editor";
import FroalaEditor from "react-froala-wysiwyg";

class TextileEditor extends React.Component {
  constructor() {
    super();

    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleUploadFile = this.handleUploadFile.bind(this);
    this.handleDownloadFile = this.handleDownloadFile.bind(this);
    this.state = {
      model: "<h1>Example text</h1>"
    };
  }

  handleModelChange(model) {
    console.log(model);
    this.setState({
      model: model
    });
  }

  handleUploadFile(e) {
    const reader = new FileReader();
    reader.onload = e => {
      this.setState({
        model: e.target.result
      });
    };
    reader.readAsText(e.target.files[0]);
  }

  handleDownloadFile() {
    this.saveFile("download.html", this.state.model);
  }

  saveFile(fileName, content) {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = fileName;
    link.href = url;
    link.click();
  }

  handleOpenUploadFile() {
    document.getElementById("file").click();
  }

  render() {
    Froala.DefineIcon("upload", {
      FA5NAME: "upload",
      template: "font_awesome_5r"
    });
    Froala.RegisterCommand("upload", {
      title: "Upload",
      icon: "upload",
      focus: true,
      undo: false,
      refreshAfterCallback: true,
      callback: () => {
        this.handleOpenUploadFile();
      }
    });
    Froala.DefineIcon("download", {
      FA5NAME: "download",
      template: "font_awesome_5r"
    });
    Froala.RegisterCommand("download", {
      title: "Download",
      icon: "download",
      focus: true,
      undo: false,
      refreshAfterCallback: true,
      callback: () => {
        this.handleDownloadFile();
      }
    });
    return (
      <div className="body-container">
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={e => this.handleUploadFile(e)}
        />
        <FroalaEditor
          model={this.state.model}
          onModelChange={this.handleModelChange}
          tag="textarea"
          config={{
            attribution: false,
            placeholder: "Start typing...",
            toolbarButtons: {
              moreText: {
                buttons: [
                  "bold",
                  "italic",
                  "underline",
                  "strikeThrough",
                  "fontFamily",
                  "fontSize",
                  "textColor",
                  "backgroundColor",
                  "subscript",
                  "superscript",
                  "inlineClass",
                  "inlineStyle",
                  "clearFormatting"
                ],
                buttonsVisible: 5
              },
              moreParagraph: {
                buttons: [
                  "alignLeft",
                  "alignCenter",
                  "alignRight",
                  "alignJustify",
                  "formatOL",
                  "formatUL",
                  "paragraphFormat",
                  "paragraphStyle",
                  "lineHeight",
                  "outdent",
                  "indent",
                  "quote"
                ],
                buttonsVisible: 6
              },
              moreRich: {
                buttons: [
                  "insertLink",
                  "insertImage",
                  "insertVideo",
                  "insertTable",
                  "emoticons",
                  "fontAwesome",
                  "specialCharacters",
                  "embedly",
                  "insertFile",
                  "insertHR"
                ],
                buttonsVisible: 6
              },
              moreMisc: {
                buttons: [
                  "undo",
                  "redo",
                  "upload",
                  "download",
                  "fullscreen",
                  "print",
                  "getPDF",
                  "spellChecker",
                  "selectAll",
                  "html",
                  "help"
                ],
                align: "right",
                buttonsVisible: 4
              }
            },
            pluginsEnabled: [
              "table",
              "spell",
              "quote",
              "save",
              "quickInsert",
              "paragraphFormat",
              "paragraphStyle",
              "help",
              "draggable",
              "align",
              "link",
              "lists",
              "file",
              "image",
              "emoticons",
              "url",
              "video",
              "embedly",
              "colors",
              "entities",
              "inlineClass",
              "inlineStyle",
              // 'codeBeautif '
              // 'spellChecker',
              "imageTUI"
            ]
          }}
        />
      </div>
    );
  }
}

export default TextileEditor;
