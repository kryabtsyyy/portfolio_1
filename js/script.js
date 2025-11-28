const skills = {
    data: [
        { skillName: 'html', value: 30, icon: 'html.svg' },
        { skillName: 'css', value: 20, icon: 'css.svg' },
        { skillName: 'python', value: 50, icon: 'c++.svg' },
        { skillName: 'cpp', value: 70, icon: 'python.svg' }
    ],

    sortType : null,

    generateList(skillList) {
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
            //levelBlock.innerHTML = `${skillData.value}%`;

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

const skillList = document.querySelector('.skill-list')

skills.generateList(skillList)

const sortBlock = document.querySelector('.skill-sort')
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