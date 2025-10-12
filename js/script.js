const skillList = document.querySelector('.skill-list');

const skills = {
    data: [
    {
        name: 'HTML',
        iconName: 'skill=html.svg', 
        level: 30, 
        className: 'skill-html' 
    },
    {
        name: 'CSS',
        iconName: 'skill=css.svg',
        level: 20,
        className: 'skill-css'
    },
    {
        name: 'Python',
        iconName: 'skill=python.svg',
        level: 50,
        className: 'skill-python'
    },
    {
        name: 'C++',
        iconName: 'skill=c++.svg',
        level: 70,
        className: 'skill-c++'
    }
    ] ,

    generateList(parentElement) {
            if (!parentElement) {
                console.error('Ошибка: Элемент-контейнер не был передан или не найден на странице.');
                return;
            }

        this.data.forEach(skill => {
            const skillNameElement = document.createElement('dt'); 
            const skillBarContainer = document.createElement('dd');  
            const skillBar = document.createElement('div');          
    
        
        skillNameElement.textContent = skill.name;

        
        skillNameElement.style.backgroundImage = `url("img/${skill.iconName}")`;

        
        skillBarContainer.classList.add('skill-level'); 

        skillBar.classList.add('skill-level-bar', skill.className);
        
        skillBar.style.width = `${skill.level}%`;
    
        
        skillBar.textContent = `${skill.level}%`; 

        
        skillBarContainer.append(skillBar); 

        
        skillList.append(skillNameElement, skillBarContainer);
                                    }) 
                            }
            };

 skills.generateList(skillList);