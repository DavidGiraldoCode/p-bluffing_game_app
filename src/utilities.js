function goTo(PATH) {
    console.log(`Go to ${PATH}`);
    window.location.hash = PATH;
}

export { goTo };