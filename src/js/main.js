difficulty_arry = {easy:[9,9,10], nomal:[16,16,40], hard:[30,16,99]}

game_box = document.getElementById("game_box");

class mine_sweeper {
    constructor(width, hight) {
        this.game_width = width
        this.game_hight = hight
    }

    create_map(width, hight, mine) {
        let width_map = Array(width);
        width_map.fill(0);
        mine_map = Array(hight);
        mine_map.fill(width_map);
        
        let placed_mine = 0;
        while (mine > placed_mine) {
            let horizon = Math.random(width);
            let vertical = Math.random(hight);
            if (mine_map[vertical][horizon] === 0) {
                mine_map[vertical][horizon] = -1;
                placed_mine++ 
            }
        }
        this.mine_map = mine_map;
    }

    box_open(event) {
        let elem = event.currentTarget
        console.log(elem)
        console.log(this.obj)
        elem.classList.remove("bg-black");
        elem.classList.add("bg-gray-400");
    }
    
    flag(event) {
        let elem = event.currentTarget;
        console.log(elem)
        console.log(event)
        console.log(this.handleEvent)
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
                horizon_box.classList.add("w-8", "h-8", "bg-black", "m-1");
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
        const game = new mine_sweeper(difficulty_arry[this.id][0], difficulty_arry[this.id][1]);
        game.create_map();
        game.game_starter();
    });
}