# Wazzup test
# Dependencies
`redis`, `postgres`
# How to start

* `npm install`
* `npm run dev` requires redis and postgres with credentials in env\
to test `npm test`

# Main architectural decisions
* Вместо того чтобы поддерживать black list разлогированных jwt токенов, я решил поддерживать white list. Главная идея в том чтобы хранить в редисе только те токены которые могут пройти аутентификацию. Так легче релизовать функцию сброса сессий со всех устройств и этот подход я посчитал более безопасным так как лучше забыть дать права чем забыть убрать права.
* Для того чтобы расшаривать неавторизованному пользователью заметки, я решил зашифровать `access payload` и использовать его как id для получение заметки без авторизаций. Эти ссылки тоже хранятся в редисе
* Есть функционал простой пагинаций по query params limit и offset.


# Необходимый функционал в API
* Регистрация пользователя\
`POST /api/users/signup`\
`body = {userName: *alphanumberic*, password: *8 chars long*}`

* Авторизация пользователя\
`POST /api/users/login`\
`body = {userName: *alphanumberic*, password: *8 chars long*}`

* Разлогин пользователя со сбросом всех сессий пользователя\
`POST /api/users/logout` сборс текущий сессий `requires Bearer`\
`POST /api/users/logout/all` сборс всей сессий `requires valid Bearer`
* Создание заметки\
`POST /api/notes` `body = {title, content}` `requires bearer`

* Получение списка заметок (учесть, что заметок может быть сколь угодно много у каждого пользователя)\
`GET /api/notes limit to first 20 and can be paginated with ?limit=10&offset=10 but they are optional`\
`GET /api/notes/:id/note` получение только одной заметки
`requires bearer`

* Редактирование заметки\
`POST /api/notes/:id/note` `body = {title?, content?}` `requires bearer`
* Удаление заметки\
`DELETE /api/notes/:id/note` `requires bearer`
* Расшаривание заметки для неавторизованного пользователя\
`POST /api/notes/:id/share` `requires bearer`
* Отображение текста заметки неавторизованному пользователю по ссылке\
`GET /api/note/:accessId/shared` тут accessId это зашифрованный payload которую можно получить только после share
       
