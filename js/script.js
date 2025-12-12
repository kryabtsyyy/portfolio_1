const skillErrorBlock = document.querySelector('.skill-error')
const skillReload = document.querySelector('.skill-reload')
const skillList = document.querySelector('.skill-list')
const sortBlock = document.querySelector('.skill-sort')
const mainNav = document.querySelector('.main-nav')
const navBtn = document.querySelector('.nav-btn')
const themeCheckbox = document.querySelector('.switch-checkbox')
const body = document.querySelector('body')

if(localStorage.getItem("darkTheme")){
    if(localStorage.getItem("darkTheme") === "true"){
        themeCheckbox.checked = true;
        body.classList.add('dark-theme');
    }
    else{
        themeCheckbox.checked = false;
        body.classList.remove('dark-theme');
    }
}

themeCheckbox.addEventListener('change', () =>{
    if(themeCheckbox.checked){
        body.classList.add('dark-theme');
    }
    else{
        body.classList.remove('dark-theme');
    }
    localStorage.setItem("darkTheme", themeCheckbox.checked);
})

const skills = {
    data : [],

    sortType : null,


    async getData(){
        await fetch('db/skills.json')
            .then(data => data.json())
            .then(object => this.data = [...object['data']])
            .catch(e => console.log("Skills load error"));
    },


    async generateList(skillList){
        if(this.data.length == 0){
            await this.getData();
            if(this.data.length == 0){
                skillErrorBlock.classList.remove('hidden')
                sortBlock.classList.add('hidden')
                return;
            }
        }

        skillList.innerHTML = '';
        this.data.forEach(skillData => {
            const nameElement = document.createElement('dt');
            nameElement.classList.add(`skill-item`)
            nameElement.style.backgroundImage = `url("img/skill=${(skillData.icon)}")`;
            nameElement.innerHTML = skillData.skillName;

            const levelElement = document.createElement('dd');
            levelElement.classList.add('skill-level');

            const levelBlock = document.createElement('div');
            levelBlock.style.width = `${skillData.value}%`;
            levelBlock.innerHTML = `${skillData.value}%`;

            levelElement.append(levelBlock);
            skillList.append(nameElement, levelElement);
        })
    },

    sortList(sortType){
        if(this.sortType === sortType){
            this.data.reverse();
        }
        else{
            switch(sortType){
                case 'name':
                    skills.data.sort(getComparer('skillName'));
                    break;
                
                case 'level':
                    skills.data.sort(getComparer('value'));
                    break;

                default:
                    return;
            }

            this.sortType = sortType;
        }

        this.generateList(skillList);
    }
}

const menu = {
    isOpen: true,

    close(){
        mainNav.classList.add('main-nav_closed');
        navBtn.classList.remove('nav-btn_close');
        navBtn.classList.add('nav-btn_open');
        navBtn.innerHTML = '<span class="visually-hidden">Открыть меню</span>'
        menu.isOpen = false;
    },

    open(){
        mainNav.classList.remove('main-nav_closed');
        navBtn.classList.remove('nav-btn_open');
        navBtn.classList.add('nav-btn_close');
        navBtn.innerHTML = '<span class="visually-hidden">Закрыть меню</span>'
        menu.isOpen = true;
    }
}

menu.close();

skills.generateList(skillList)

skillReload.addEventListener('click', () => {
    skillErrorBlock.classList.add('hidden')
    sortBlock.classList.remove('hidden')
    skills.generateList(skillList);
})

sortBlock.addEventListener('click', (e) => {
    if (e.target.nodeName !== "BUTTON"){
        return;
    }

    const sortType = e.target.dataset.type;

    skills.sortList(sortType);
});

function getComparer(prop){
    return function(a, b){
        if(a[prop] < b[prop]){
            return -1;
        }
        if(a[prop] > b[prop]){
            return 1;
        }
        return 0;
    }
}

navBtn.addEventListener('click', () => {
    if(menu.isOpen){
        menu.close();
    }
    else{
        menu.open();
    }
})