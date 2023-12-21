function goTo(PATH) {
    //console.log(`Go to ${PATH}`);
    window.location.hash = PATH;
}

async function propsWithLoading(propsFunction, props) {
    try {
        props.model.isLoading = true;
        await propsFunction
        props.model.isLoading = false;
        return true;
    } catch (error) {
        // Handle the error as needed
        console.error("An error occurred:", error);
        return false;
    }
}

function getPlayerNamesFromIDs(arrayOfPlayerIDs) {
    //
    //const dir = `/sessions/${sessionID}/playersFB/${arrayOfPlayerIDs[i]}/playerNameFB`
    //arrayOfPlayerIDs.map()
}

export { goTo, propsWithLoading, getPlayerNamesFromIDs };