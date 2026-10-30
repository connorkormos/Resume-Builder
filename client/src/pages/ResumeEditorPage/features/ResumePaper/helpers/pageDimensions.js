export const getPageDimensions = (pageRef, index) => {

    console.log(`GETTING PAGE DIMENSIONS FOR REF AT INDEX: ${index}`, pageRef);
    const pageElement = pageRef.current;
    if (!pageElement) return;
    const pageRect = pageElement.getBoundingClientRect();
    const pageBottom = pageRect.bottom;

    const pageContainers = pageRef.current ? Array.from(pageRef.current.children) : [];
    // console.log(`PAGE REF CHILDREN FOR INDEX ${index}: `, pageContainers);
    pageContainers.forEach((container) => {
        console.log('CONTAINER: ', container);
        const containerRect = container.getBoundingClientRect();
        const containerBottom = containerRect.bottom;
        const containerId = container.getAttribute('data-container-id');
        const containerSections = container ? Array.from(container.children).filter(child => child.classList.contains('resumeSection')) : [];
        console.log(`CONTAINER RECT ${containerId}: `, containerRect);
        console.log(`PAGE RECT ${index}: `, pageRect);

        // the children need to have a class of "resumeSection" to be considered valid sections within the container
        // console.log(`CONTAINER SECTIONS FOR CONTAINER ID ${containerId}: `, containerSections);
    })

    // console.log("Wrapper height:", pageRef.current.clientHeight);
    // console.log("Content height:", pageRef.current.scrollHeight);
};