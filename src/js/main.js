difficulty_arry = {easy:[9,9,10], nomal:[16,16,40], hard:[30,16,99]}

function get_randomInt(max) {
    return Math.floor(Math.random() * max);
}

game_box = document.getElementById("game_box");

class mine_sweeper {
    constructor(width, hight, mine) {
        this.game_width = width
        this.game_hight = hight
        this.mine = mine
    }

    create_map() {
        this.mine_map = []
        for (let i = 0; i < this.game_hight; i++) {
            this.mine_map[i] = [];
            for (let j = 0; j < this.game_width; j++) {
                this.mine_map[i][j] = 0;
            }
        }
        let placed_mine = 0;
        while (placed_mine < this.mine) {
            let horizon = get_randomInt(this.game_width);
            let vertical = get_randomInt(this.game_hight);
            if (this.mine_map[vertical][horizon] === 0) {
                this.mine_map[vertical][horizon] = -1;
                placed_mine++;
            }
        }
    }

    box_open(event) {
        let elem = event.currentTarget
        elem.classList.remove("bg-black");
        elem.classList.add("bg-gray-400");
    }
    
    flag(event) {
        let elem = event.currentTarget;
        elem.classList.remove("bg-black");
        elem.classList.add("bg-red-400");
    }

    game_starter() {
        while (game_box.firstChild) {
            game_box.removeChild(game_box.firstChild);
        }
        for (let i = 0; i < this.game_hight; i++) {
            const vertical_box = document.createElement("div");
            vertical_box.classList.add("flex");
            for (let j = 0; j < this.game_width; j++) {
                const horizon_box = document.createElement("div");
                horizon_box.classList.add("w-8", "h-8", "bg-green-200", "m-1", "text-center");
                horizon_box.textContent = this.mine_map[i][j]
                horizon_box.addEventListener("click", {obj: this, handleEvent: this.box_open});
                horizon_box.addEventListener("contextmenu",{obj: this, handleEvent: this.flag});
                vertical_box.appendChild(horizon_box);
            }
            game_box.appendChild(vertical_box);
        }
    }
}



const selecter = document.getElementsByClassName("difficulty")
for (let i = 0; i < selecter.length; i++) {
    selecter[i].addEventListener("click", function(){
        const game = new mine_sweeper(difficulty_arry[this.id][0], difficulty_arry[this.id][1], difficulty_arry[this.id][2]);
        game.create_map();
        game.game_starter();
    });
}