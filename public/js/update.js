const update = async () => {
    const data = await fetch('http://localhost:3000/studentInfo',{
        method:"GET"
    });
    const result = await data.json();
    // console.log(result);
    document.getElementById('name').value = result.name;
    document.getElementById('age').value = result.age;
    document.getElementById('phone').value = result.phone;
    document.getElementById('class').value = result.class;
    document.getElementById('email').value = result.email;
    document.getElementById('password').value = result.password;
}

update();