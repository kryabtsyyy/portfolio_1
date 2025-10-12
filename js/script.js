const skillList = document.querySelector('.skill-list');

const skills = {
    data: [
    {
        // Название навыка 
        name: 'HTML',
        //Хранение файла иконки
        iconName: 'skill=html.svg', 
        // Уровень владения (число от 0 до 100)
        level: 30, 
        // Уникальный CSS-класс 
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
        className: 'skill-cpp'
    }
    ] ,

    generateList(parentElement) {
            if (!parentElement) {
                console.error('Ошибка: Элемент-контейнер не был передан или не найден на странице.');
                return;
            }

        // Создание элементов
        // Настройка элементов 
        this.data.forEach(skill => {
            const skillNameElement = document.createElement('dt'); // Название навыка (HTML, CSS и т.д.)
            const skillBarContainer = document.createElement('dd');  // Контейнер для полосы прогресса
            const skillBar = document.createElement('div');          // Полоса прогресса
    
        // Название навыка (dt)
        skillNameElement.textContent = skill.name;

        //Интерполяция для создания пути
        skillNameElement.style.backgroundImage = `url("../img/${skill.iconName}")`;

        // Контейнер полосы прогресса (dd)
        skillBarContainer.classList.add('skill-bar-container'); 
    
        // Добавляем уникальный класс для конкретного навыка 
        skillBar.classList.add('skill-bar', skill.className);
    
        // Установка ширины полосы (в процентах)
        skillBar.style.width = `${skill.level}%`;
    
        // Добавляем текст
        skillBar.textContent = `${skill.level}%`; 

        // Вложение элементов
        skillBarContainer.append(skillBar); 

        // Добавление элементов на страницу
        skillList.append(skillNameElement, skillBarContainer);
                                    }) 
                            }
            };

 skills.generateList(skillList);