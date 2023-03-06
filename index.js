const APIURL = "https://api.github.com/users/";
const main= document.querySelector("#main");
const repos=document.querySelector("#repos");
const getUser= async(username)=>{
    const response=await fetch(APIURL + username);
    const data=await response.json();
    const card= `
    <div class="card">
        <div>
            <img class="avatar" src="${data.avatar_url}" alt="${data.name}" />
        </div>
        <div class="user-info">
            <h2>${data.name}</h2>
            <p>${data.bio}</p>
            <ul class="info">
                <li>${data.followers}<strong>Followers</strong></li>
                <li>${data.following}<strong>Following</strong></li>
                <li>${data.public_repos}<strong>Repos</strong></li>
            </ul>
            <div id="repos"></div>
        </div>
    </div>
`;
main.innerHTML=card;
    
getrepos(username);
}
getUser("yihui ");

const getrepos=async(username)=>{
    const repos=document.querySelector("#repos");
    console.log(repos)
    const response=await fetch(APIURL + username + "/repos" );
    const data=await response.json();
    data.forEach(
        (item)=>{
            const repoEl = document.createElement("a");
            repoEl.classList.add("repo");

            repoEl.href = item.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = item.name;

            repos.appendChild(repoEl);
        }
    )
    
}
const formSubmit=()=>{
     const searchbox=document.querySelector("#search");
     if (searchbox.value !=""){
         getUser(searchbox.value)
     }
     return false
}