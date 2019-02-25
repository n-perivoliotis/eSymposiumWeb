function viewDetails() {

    let pOptions = document.getElementById('userSelection').options;
    let username = pOptions[pOptions.selectedIndex].value;
    window.location.pathname = '/eSymposium/users/' + username;
    // document.getElementById('userInfo').style.display = 'block';
    // console.log(user.symposiumUsername);

}

function test(){
    console.log('I was triggered');
}