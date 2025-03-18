document.addEventListener("DOMContentLoaded", () => {

    const tabButtonContainer = document.querySelector(".tab-buttons");
    const tabContentContainer = document.querySelector(".content-container");
    const addTabButton = document.querySelector(".add-tab-btn");
    let tabCount = document.querySelectorAll(".tab-content").length;

    if (!tabButtonContainer || !tabContentContainer || !addTabButton) {
        console.warn("Required tab system elements not found");
        return;
    }


    const switchTab = (clickedTab, tabId) => {
        document.querySelectorAll(".tab-button").forEach(btn => {
            btn.classList.remove("active");
            btn.setAttribute("aria-selected", "false");
        });
        document.querySelectorAll(".tab-content").forEach(content => {
            content.classList.remove("active");
        });

        clickedTab.classList.add("active");
        clickedTab.setAttribute("aria-selected", "true");
        const targetContent = document.getElementById(tabId);
        if (targetContent) {
            targetContent.classList.add("active");
        }
    };

    const createNewTab = () => {

        const tabTitle = prompt("Enter a Title", "New Tab")?.trim();
        const tabContentText = prompt("Enter Tab content", "New content here")?.trim();

        if (!tabTitle || !tabContentText) {
            alert("Title and content cannot be empty. Please try again.");
            return;
        }

        tabCount++;

        const newTabButton = document.createElement("button");
        newTabButton.classList.add("tab-button");
        newTabButton.id = `tab-${tabCount}-button`;
        Object.assign(newTabButton, {
            role: "tab",
            "aria-controls": `tab-${tabCount}`,
            "aria-selected": "false",
            "data-target": `tab-${tabCount}`,
            textContent: tabTitle
        });

        const newTabContent = document.createElement("div");
        newTabContent.classList.add("tab-content");
        newTabContent.id = `tab-${tabCount}`;
        newTabContent.setAttribute("role", "tabpanel");
        newTabContent.setAttribute("aria-labelledby", `tab-${tabCount}-button`);

        const titleElement = document.createElement("h2");
        titleElement.textContent = tabTitle;
        const contentElement = document.createElement("p");
        contentElement.textContent = tabContentText;
        newTabContent.append(titleElement, contentElement);

        tabButtonContainer.appendChild(newTabButton);
        tabContentContainer.appendChild(newTabContent);

        switchTab(newTabButton, `tab-${tabCount}`);

        tabButtonContainer.scrollTo({
            top: 0,
            left: tabButtonContainer.scrollWidth,
            behavior: "smooth"
        });

        newTabButton.focus();
    };

    tabButtonContainer.addEventListener("click", (event) => {
        const clickedTab = event.target;
        if (!clickedTab.classList.contains("tab-button")) return;

        const tabId = clickedTab.getAttribute("data-target");
        if (!tabId) return;

        switchTab(clickedTab, tabId);
    });

    addTabButton.addEventListener("click", createNewTab);
});