const studentData = async () => {
    const data = await fetch('http://localhost:3000/studentInfo',{
        method:'GET'
    });

    const result = await data.json();

    document.getElementById('name').innerHTML = result.name;
    document.getElementById('age').innerHTML = result.age;
    document.getElementById('phone').innerHTML = result.phone;
    document.getElementById('class').innerHTML = result.class;
    document.getElementById('email').innerHTML = result.email;
}

studentData();