const mainDiv = document.getElementById("editTimers");

const moveUp = (timers, currentIndex) => {
    console.log(timers)
}

const moveDown = (timers, currentIndex) => {
    console.log(timers)
}

const showTimers = async () => {
    mainDiv.innerHTML="";
    const timers = await getFromChromeSyncStorage();
    timers.forEach((e, i) => {
        const singleTimer = document.createElement("div");
        singleTimer.classList.add("singleTimer", "padding-10", "border-radius-10", "show_hide");
        singleTimer.draggable = true;
            const leftSide = document.createElement("div");
            leftSide.classList.add("leftSide");
                const arrowUp = document.createElement("img");
                arrowUp.src = "img/up.svg";
                arrowUp.classList.add("cursor-pointer");
                arrowUp.addEventListener("click", () => {
                    moveUp(timers, i);
                })
                leftSide.appendChild(arrowUp);

                const arrowDown = document.createElement("img");
                arrowDown.src = "img/down.svg";
                arrowDown.classList.add("cursor-pointer");
                arrowDown.addEventListener("click", () => {
                    moveDown(timers, i);
                })
                leftSide.appendChild(arrowDown);
            singleTimer.appendChild(leftSide);

            const rightSide = document.createElement("div");
                const rightSide_firstRow = document.createElement("div");
                rightSide_firstRow.classList.add("row");
                    const rightSide_firstRow_title = document.createElement("div");
                    rightSide_firstRow_title.innerText = e["title"];
                    rightSide_firstRow.appendChild(rightSide_firstRow_title);

                    const optionDiv = document.createElement("div");
                    optionDiv.classList.add("show_hide_child");
                        const editDiv = document.createElement("div");
                            const editImg = document.createElement("img");
                            editImg.src = "img/edit.svg";
                            editDiv.appendChild(editImg);
                                                        
                            const editText = document.createElement("span");
                            editText.innerText = "Edit timer";
                            editDiv.appendChild(editText);
                        optionDiv.appendChild(editDiv);

                        const removeDiv = document.createElement("div");
                            const removeImg = document.createElement("img");
                            removeImg.src = "img/delete.svg";
                            removeDiv.appendChild(removeImg);
                                                        
                            const removeText = document.createElement("span");
                            removeText.innerText = "Remove timer";
                            removeDiv.appendChild(removeText);
                        optionDiv.appendChild(removeDiv);
                    rightSide_firstRow.appendChild(optionDiv);
                rightSide.appendChild(rightSide_firstRow);
            singleTimer.appendChild(rightSide);
        mainDiv.appendChild(singleTimer);

    });
}

window.addEventListener("load", async () => {
    showTimers();
})