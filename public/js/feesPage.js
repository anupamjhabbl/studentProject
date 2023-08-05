const feesInfo = async () => {
    const data = await fetch('http://localhost:3000/feeInfo',{
        method:"GET"
    })
    const feeInfo = await data.json();

    if (feeInfo!=null){
        document.getElementById('name').innerHTML = feeInfo.name;
        document.getElementById('admissionDate').innerHTML = feeInfo.admissionDate;
        document.getElementById('paidUpto').innerHTML = feeInfo.paidUpto;
        document.getElementById('balance').innerHTML = feeInfo.balanceUptoPaidDate;

        let feelist = document.getElementById('content');
        feeInfo.paidDate.forEach(element => {
            const para = document.createElement('p');
            para.innerHTML = `Date: ${element.date}, amount: ${element.amount}`;
            feelist.appendChild(para);
        });
    }
}

feesInfo();