class DirectionInput {
    constructor() {
        this.heldDirections = [];
    }

    init() {
        document.addEventListener("keydown", e => {
            console.log(event.code);
        });
    }
}