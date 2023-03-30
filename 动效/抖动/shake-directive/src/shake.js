

export default {
    inserted(el,{value},vnode){
        if (typeof value === "boolean" && value) {
            if (!el.classList.contains("apply-shake")) {
                el.classList.add("apply-shake");

                document.styleSheets.add()
            }
            const id = setTimeout(() => {
                el.classList.remove("apply-shake");
                clearTimeout(id);
            }, 820);
        }
    }
}