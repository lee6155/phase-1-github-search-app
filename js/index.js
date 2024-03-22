
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault()
        function getUserInfo () {
            fetch(`https://api.github.com/search/users?q=${e.target.search.value}`)
            .then(response => response.json())
            .then(function(data){
            let array = data.items
                array.forEach(function(info){

                    let infoSet = document.getElementById('user-list')

                    let username = document.createElement('p')
                    username.textContent = `${info.login}`
                    infoSet.append(username)

                    let avatar = document.createElement('img')
                    infoSet.append(avatar)
                    avatar.setAttribute('src',`${info.avatar_url}`)

                    let link = document.createElement('a')
                    infoSet.append(link)
                    link.setAttribute('href',`${info.html_url}`)
                    link.textContent = 'Click here for profile link'

                    let repo = document.createElement('li')
                    repo.textContent = 'Click here to see repos'
                    repo.setAttribute('id',`${info.login}`)
                    repo.setAttribute('class','repo-class')
                    infoSet.append(repo)
                })
            })
        }
        getUserInfo()
    })
})

document.addEventListener('click', function(e) {
    const target = e.target.closest('.repo-class')
    fetch(`https://api.github.com/users/${target.id}/repos`)
    .then(response => response.json())
    .then(function(data){
        data.forEach(function(info) {

            //let infoSet = document.getElementById('repos-list')

            let repo = document.createElement('ul')
            repo.textContent = `${info.name}`
            target.append(repo)
        })
    })
})
