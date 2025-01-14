import { dragMoveHelper } from "./utils/index";

export default function(mind) {
  mind.map.addEventListener("click", e => {
    // if (dragMoveHelper.afterMoving) return
    if (!e.target.className.includes("not-prevent")) e.preventDefault();
    if (e.target.className.includes("attachment") && mind.clickOnAttachment) {
      const dataName = e.target.getAttribute("data-name");
      const dataValue = e.target.getAttribute("data-value");
      mind.clickOnAttachment(dataName, dataValue);
    } else if (!mind.editable) {
      return;
    } else if (e.target.nodeName === "EPD") {
      mind.expandNode(e.target.previousSibling);
    } else if (e.target.parentElement.nodeName === "T" || e.target.parentElement.nodeName === "ROOT") {
      mind.selectNode(e.target);
    } else if (e.target.nodeName === "path") {
      if (e.target.parentElement.nodeName === "g") {
        mind.selectLink(e.target.parentElement);
      }
    } else if (e.target.className === "circle") {
      // skip circle
    } else {
      mind.unselectNode();
      mind.hideLinkController();
    }
  });

  mind.map.addEventListener("dblclick", e => {
    e.preventDefault();
    if (!mind.editable) return;
    if (e.target.parentElement.nodeName === "T" || e.target.parentElement.nodeName === "ROOT") {
      mind.beginEdit(e.target);
    }
  });

  /**
   * drag and move
   */
  mind.map.addEventListener("mousemove", e => {
    // click trigger mousemove in windows chrome
    // the 'true' is a string
    if (!mind.editable) return;
    if (e.target.contentEditable !== "true") {
      dragMoveHelper.onMove(e, mind.container);
    }
  });
  mind.map.addEventListener("mousedown", e => {
    if (!mind.editable) return;
    if (e.target.contentEditable !== "true") {
      dragMoveHelper.afterMoving = false;
      dragMoveHelper.mousedown = true;
    }
  });
  mind.map.addEventListener("mouseleave", e => {
    if (!mind.editable) return;
    dragMoveHelper.clear();
  });
  mind.map.addEventListener("mouseup", e => {
    if (!mind.editable) return;
    dragMoveHelper.clear();
  });
}
