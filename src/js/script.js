const bin = document.getElementById('bin');
const okt = document.getElementById('okt');
const des = document.getElementById('des');
const hex = document.getElementById('hex');
const wrapBinner = document.getElementsByClassName('wrap-binner')[0];
const rules = document.getElementsByClassName("rumus")[0];
const getTittle = document.getElementById('tittle-rumus');
const getRumus = document.querySelector('.rumus');


//          Binnary Coverter 
bin.addEventListener('input', e => {
    e.target.value = e.target.value.replace(/[^0-1]/g, '').replace(/(.{4})/g, '$1 ').trim();
    let str;
    if (e.target.value == '') {
        str = 0;
    } else {
        str = e.target.value.replace(/\s/g, '');
    }
    okt.value = converterBil(str, 2, 8);
    des.value = converterBil(str, 2, 10);
    hex.value = converterBil(str, 2, 16);
    getTittle.style.display = 'block';
    
    if (str == 0) {
        ifZero();
    } else {
        binnerRules(str);
    };
})

//          Octal Converter
okt.addEventListener('input', e => {
    e.target.value = e.target.value.replace(/[^0-7]/g, '').trim();
    let val;
    if (e.target.value == '') {
        val = 0;
    } else {
        val = e.target.value;
    }
    bin.value = converterBil(val, 8, 2).replace(/\d{4}(?=.)/g, '$& ');
    getTittle.style.display = 'block';
    des.value = converterBil(val, 8, 10);
    hex.value = converterBil(val, 8, 16);
    oktalRules(val);
    if (val == 0) {
        ifZero();
    }
})

//          Desimal Converter
des.addEventListener('input', e => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '').trim();
    let val;
    if (e.target.value == '') {
        val = 0;
    } else {
        val = e.target.value;
    }
    bin.value = converterBil(val, 10, 2).replace(/\d{4}(?=.)/g, '$& ');
    okt.value = converterBil(val, 10, 8);
    hex.value = converterBil(val, 10, 16);
    getTittle.style.display = 'block';
    desimalRules(val);
    if (val == 0) {
        ifZero();
    }
})

//          Hexadecimal
hex.addEventListener('input', e => {
    e.target.value = e.target.value.replace(/[^0-9,a,b,c,d,e,f]/g, '').trim();
    let val;
    if (e.target.value == '') {
        val = 0;
    } else {
        val = e.target.value;
    }
    bin.value = converterBil(val, 16, 2).replace(/\d{4}(?=.)/g, '$& ');
    des.value = converterBil(val, 16, 10);
    okt.value = converterBil(val, 16, 8);
    getTittle.style.display = 'block';
    hexRules(val)
    if (val == 0) {
        ifZero();
    }
})

// Converter

function converterBil(num, bil, con) {
    var convert = parseInt(num, bil).toString(con);
    return convert;
}

// Delete element
function ifZero() {
    bin.value = '';
    okt.value = '';
    des.value = '';
    hex.value = '';
    rules.innerHTML = '';
    getTittle.style.display = 'none';
    getRumus.classList.remove('rumus-change');
}

// Blink Rumus
let valueBut = 1;
function setRumus() {
    if (valueBut == 1) {
        valueBut = 0;
        getRumus.classList.toggle('rumus-change');
    } else {
        valueBut = 1;
        getRumus.classList.toggle('rumus-change');
        
    }
}

// Rumus For Binner Converter

function binnerRules(num) {
    let numBin = num;
    if (num.length % 3 == 1) {
        numBin = "00" + num;
    }
    if (num.length % 3 === 2) {
        numBin = "0" + num;
    }

    let binOkt = [];
    if (num != 0) {
        binOkt.push(numBin.match(/.{3}/g));
    }
    rules.innerHTML = '';

    // Create Element Binner to Oktal
    let getA = document.createElement('div');
    let a1 = document.createElement("div");
    let a2 = document.createElement("div");
    let a6 = document.createElement("p");
    let a7 = document.createElement("h3");
    getA.classList.add('pemisah');
    a1.classList.add('perkalian');
    a2.classList.add('perkalian');
    a6.innerHTML = num + '<sub>2</sub>';
    a7.innerHTML = "Binner    ->    Octal"
    a1.appendChild(a7);
    a1.appendChild(a6);
    rules.appendChild(getA);
    getA.appendChild(a1);
    getA.appendChild(a2);

    let binOktalNum = document.getElementsByClassName('perkalian')[1];
    let perkalianBinner = [];
    let hasilPerkalianBin = [];
    let binnerOktal = [];
    binOkt[0].forEach((p, i) => {
        perkalianBinner.push(`(${p.charAt(0)} x 2<sup class='garis'>3</sup>)+(${p.charAt(1)} x 2<sup class='garis'>2</sup>)+(${p.charAt(2)} x 2<sup class='garis'>1</sup>)`);
        hasilPerkalianBin.push(`${p.charAt(0) * pangkatBil(2,2)} <span class="garis">+</span> ${p.charAt(1) * pangkatBil(2,1)} <span class="garis">+</span> ${p.charAt(2) * pangkatBil(2,0)}`);
        binnerOktal.push(p.charAt(0) * pangkatBil(2,2) + p.charAt(1) * pangkatBil(2,1) + p.charAt(2) * pangkatBil(2,0));
    });
    binOktalNum.innerHTML = `<details><summary>Pisahkan setiap 3 bilangan :</summary><div class='info-text'>Setiap angka dipisahkan menjadi 3 bilangan untuk memudahkan operator perkalian ke oktal.</div></details>
    ${binOkt[0].join('<span class="garis"> | </span>')}` + "<br><br>" + "<details><summary>Kali berurutan setiap bilangan</summary><div class='info-text'>Kali berurutan setiap bilangan yang telah di pisahkan dengan 2 bersama dengan urutan pangkat, pangkat dimulai dari 0 diakhiri 2.</div></details>"+
    perkalianBinner.join('<span class="garis"> | </span>') + "<br><br>" + "<details><summary>Jumlahkan setiap hasil</summary><div class='info-text'>Setiap hasil yang telah di kali berurutan akan di tambah setiap bilangannya tetapi masih memiliki sekat.</div></details>"+
    hasilPerkalianBin.join('<span class="garis"> | </span>') + "<br><br>"+"<details><summary>Hasil Penjumlahan</summary><div class='info-text'>Sekarang masukkan setiap bilangan dari kiri kekanan untuk mendapatkan nilai oktal.</div></details>"+
    binnerOktal.join('<span class="garis"> | </span>') +"<br><br>"+ "<span class='garis opacity'>Hasil Binner ke Oktal</span><br>"+
    okt.value + "<sub class='garis'>8</sub>";

    // Binner ke Desimal
    let getB = document.createElement('div');
    let b1 = document.createElement('div');
    let b2 = document.createElement('div');
    let b5 = document.createElement("p");
    let b6 = document.createElement("h3");
    b5.innerHTML = num + ' <sub> (2)</sup>';
    b6.innerHTML = "Binner    ->    Desimal";
    getB.classList.add('pemisah');
    b1.classList.add('perkalian');
    b2.classList.add('perkalian');
    b1.appendChild(b6);
    b1.appendChild(b5);
    rules.appendChild(getB);
    getB.appendChild(b1);
    getB.appendChild(b2);

    let binOktalNum2 = document.getElementsByClassName('perkalian')[3];
    let binOktal = [];
    let jumlahOktal = [];
    for (let i = 0; i < num.length; i++) {
        binOktal.push(`${num.charAt(i)} x 2<sup >${i}</sup> = ${num.charAt(i) * pangkatBil(2,i)}`);
        jumlahOktal.push(num.charAt(i) * pangkatBil(2,i));
    }
    binOktalNum2.innerHTML = "<details><summary>Kali 2 setiap bilangan</summary><div class='info-text'>Kali 2 setiap bilangan dengan pangkat berurutan yang dimulai dari 0.</div></details>"+binOktal.reverse().join('<br>') + "<br><br>" +
    "<details><summary>Hasil Perkalian</summary><div class='info-text'>Ini adalah hasil dari perkalian yang akan dijumlahkan untuk mendapatkan nilai Desimal</div></details>"+jumlahOktal.join('<span class="garis"> + </span>') + "<br><br>" + "<span class='garis opacity'>Hasil Binner Desimal :</span><br>" +
    des.value + '<sub class="garis">10</sub>';

    // Binner ke Hexadesimal
    let getC = document.createElement('div');
    let c1 = document.createElement('div');
    let c2 = document.createElement('div');
    let c5 = document.createElement("p");
    let c6 = document.createElement("h3");
    c5.innerHTML = num + ' <sub> (2)</sup>';
    c6.innerHTML = "Binner    ->    Hexadesimal";
    getC.classList.add('pemisah');
    c1.classList.add('perkalian');
    c2.classList.add('perkalian');
    c1.appendChild(c6);
    c1.appendChild(c5);
    rules.appendChild(getC);
    getC.appendChild(c1);
    getC.appendChild(c2);
    
    let numHex = num;
    if (numHex.length % 4 == 1) {
        numHex = '000' + numHex;
    }
    if (numHex.length % 4 == 2) {
        numHex = '00' + numHex;
    }
    if (numHex.length % 4 == 3) {
        numHex = '0' + numHex;
    }
    let valBinHex = [];
    valBinHex.push(numHex.match(/.{4}/g));
    let binOktalNum3 = document.getElementsByClassName('perkalian')[5];
    let kaliBineToHex = [];
    let jumlahBinToHex = [];
    let jumlahHasilBin = [];
    valBinHex[0].forEach((p,i) => {
        kaliBineToHex.push(`(${p.charAt(0)} x 2<sup class='garis'>3</sup>) + (${p.charAt(1)} x 2<sup class='garis'>2</sup>) + (${p.charAt(2)} x 2<sup class='garis'>1</sup>) + (${p.charAt(3)} x 2<sup class='garis'>0</sup>)`);
        jumlahBinToHex.push(`${p.charAt(0) * pangkatBil(2,3)} + ${p.charAt(1) * pangkatBil(2,2)} + ${p.charAt(2) * pangkatBil(2,1)} + ${p.charAt(3) * pangkatBil(2,0)}`);
        jumlahHasilBin.push(p.charAt(0) * pangkatBil(2,3) + p.charAt(1) * pangkatBil(2,2) + p.charAt(2) * pangkatBil(2,1)+ p.charAt(3) * pangkatBil(2,0));

    });
    jumlahHasilBin.forEach((p,i) => {
        switch (p) {
            case 10:
                jumlahHasilBin[i] = '10 = a';
                break;
            case 11:
                jumlahHasilBin[i] = '11 = b';
                break;
            case 12:
                jumlahHasilBin[i] = '12 = c';
                break;
            case 13:
                jumlahHasilBin[i] = '13 = d';
                break;
            case 14:
                jumlahHasilBin[i] = '14 = e';
                break;
            case 15:
                jumlahHasilBin[i] = '15 = f';
                break;
        }
    });
        
    binOktalNum3.innerHTML = "<details><summary>Pecah Bilangan</summary><div class='info-text'>Pecah bilangan menjadi 4 bagian setiap bilangan jika bilangan tidak mencukupi untuk dibelah menjadi 4 silakan tambahkan 0, ingat memecha bilangan dimulai dari kanan kiri.</div></details>"+valBinHex[0].join('<span class="garis"> | </span>') + "<br><br>" + "<details><summary>Kali dengan 2 :</summary><div class='info-text'>Kalikan setiap pecahan bilangan dengan 2 bersama dengan pangkat berurutan dimulai dari nol dari kanan ke kiri.</div></details>"+
    kaliBineToHex.join('<span class="garis"> | </span>') + "<br><br>" +
    jumlahBinToHex.join('<span class="garis"> | </span>') + "<br><br>" +"<details><summary>Hasil Nilai :</summary><div class='info-text'>Satukan semua hasil yang dimulai dari kiri ke kanan hati-hati terhadapa nilai di atas dari 9 karna itu akan di ganti dengan huruf.</div></details>" +
    jumlahHasilBin.join('<span class="garis"> | </span>') + "<br><br>" +
    "<span class='garis opacity'>Hasil Binner ke Hexadesimal :</span><br>"+hex.value + "<sub class='garis'>16</sub>";
}

// Rules Oktal ==================================================================================================================================
function oktalRules(num) {
    rules.innerHTML = '';

    // Oktal ke Binner 
    let getA = document.createElement('div');
    let a1 = document.createElement('div');
    let a2 = document.createElement('div');
    let a5 = document.createElement("p");
    let a6 = document.createElement("h3");
    a5.innerHTML = num + ' <sub> (8)</sup>';
    a6.innerHTML = "Octal    ->    Binner";
    getA.classList.add('pemisah');
    a1.classList.add('perkalian');
    a2.classList.add('perkalian');
    a1.appendChild(a6);
    a1.appendChild(a5);
    rules.appendChild(getA);
    getA.appendChild(a1);
    getA.appendChild(a2);
    let binOktalNum1 = document.getElementsByClassName('perkalian')[1];

    let binData1 = [];
    let binData2 = [];
    let binData3 = [];
    for (let i = 0; i < num.length; i++) {
        binData1.push(num.charAt(i));
        let myBin = '';
    
        if (num.charAt(i) == 1) {myBin = '001';}
        else if (num.charAt(i) == 2){myBin = '010';}
        else if (num.charAt(i) == 3){myBin = '011';}
        else {myBin = converterBil(num.charAt(i), 8, 2);}
        binData2.push(myBin);
    }
    binData1.forEach((p, i) => {
        let modus = [];
        let bagi = [];
        let myNumber = [];
        function calcBin1(angka) {
            angka = parseInt(angka);
            myNumber.push(angka);
            modus.push(angka % 2);
            let hasil = Math.floor(angka / 2);
            bagi.push(hasil);
            if (angka < 2) {
    
            } else {
                calcBin1(hasil);
            }
        }
        calcBin1(p);
        let hasil = [];
        for (let u = 0; u < modus.length; u++) {
            hasil.push(`${myNumber[u]} : 2 = ${bagi[u]} sisa bagi adalah <span class="garis">${modus[u]}</span> <br>`);
        }
        let conHasil = hasil.join('');
        binData3.push(conHasil);
    });
    
    binOktalNum1.innerHTML = binData1.slice().join('<span class="garis"> | </span>') +'<br><br>'+  "<details><summary class='info-text'>Bagi Bilangan :</summary><div class='info-text'>Bagi setiap bilangan dengan pembagian modulus dan kurangkan hasil dengan bilangan kemudia bagi dengan 2 , lakukan terus sampai angka menjadi 0 'nol' , jangan lupa memisah hasil modulus.</div></details>"+
    binData3.join('<hr>')+ '<br><br>'+ "<details><summary class='info-text'>Ambil Sisa Bagi :</summary><div class='info-text'>Untuk mendapatkan nilai binner ambil nilai modulus dari bawah ke atas setiap bilangan harus mempunyai 3 bilangan jika kurang kamu bisa menambahkan nol '0' dibelakang nilai sampai menjadi 3 bilangan.</div></details>"+
    binData2.slice().join('<span class="garis"> | </span>')+ '<br><br>'+"<span class='garis opacity'>Hasil Oktal ke Binner :</span><br>"+
    binData2.slice().join('')+ ' <sub> (2)</sup>';

    // Oktal ke Desimal
    let getB = document.createElement('div');
    let b1 = document.createElement('div');
    let b2 = document.createElement('div');
    let b5 = document.createElement("p");
    let b6 = document.createElement("h3");
    b5.innerHTML = num + ' <sub> (8)</sup>';
    b6.innerHTML = "Octal    ->    Desimal";
    getB.classList.add('pemisah');
    b1.classList.add('perkalian');
    b2.classList.add('perkalian');
    b1.appendChild(b6);
    b1.appendChild(b5);
    rules.appendChild(getB);
    getB.appendChild(b1);
    getB.appendChild(b2);

    let binOktalNum2 = document.getElementsByClassName('perkalian')[3];

    let octalData1 = [];
    let octalData2 = [];
    let octalData3 = [];
    let octalData4 = [];
    for (let u = num.length- 1; u>=0; u--) {
        octalData1.push(num.charAt(u));
        octalData2.push(u);
    }
    for (let i = 0; i < octalData1.length; i++) {
        octalData3.push(`(${octalData1[i]} x 8 <sup class='garis'>${i}</sup>)`)
        octalData4.push(octalData1[i] * pangkatBil(8,i));
    }
    binOktalNum2.innerHTML = octalData1.slice().join('<span class="garis"> | </span>') + '<br><br>' + "<details><summary class='info-text'>Kali Dengan Pangkat :</summary><div class='info-text'>Kali kan setiap bilangan yang telah dipisah tersebut, sertakan pangkat sesuai urutannya.</div></details>"+
    octalData3.slice().join('<span class="garis"> + </span>') + '<br><br>' + "<details><summary class='info-text'>Tambahkan Semua Hasil :</summary><div class='info-text'>Hasil dari operator perkalian di atas bisa kamu jumlahkan untuk mendapatkan bilangan desimal.</div></details>"+
    octalData4.slice().join('<span class="garis"> + </span>') + '<br><br>' + "<span class='garis opacity'>Hasil oktal ke desimal :</span><br>" +
    des.value + ' <sub> (8)</sup>';

    //  Oktal ke Hexadesimal
    let getC = document.createElement('div');
    let c1 = document.createElement('div');
    let c2 = document.createElement('div');
    let c5 = document.createElement("p");
    let c6 = document.createElement("h3");
    c5.innerHTML = num + ' <sub> (8)</sup>';
    c6.innerHTML = "Octal    ->    Hexadesimal";
    getC.classList.add('pemisah');
    c1.classList.add('perkalian');
    c2.classList.add('perkalian');
    c1.appendChild(c6);
    c1.appendChild(c5);
    rules.appendChild(getC);
    getC.appendChild(c1);
    getC.appendChild(c2);

    let binOktalNum3 = document.getElementsByClassName('perkalian')[5];
    let conBil = converterBil(num,8,2);
    let numHex = conBil;
    if (numHex.length % 4 == 1) {
        numHex = '000' + conBil;
    }else if (numHex.length % 4 == 2) {
        numHex = '00' + conBil;
    } else if (numHex.length % 4 == 3){
        numHex = '0' + conBil;
    } else {
        numHex = conBil;
    }
    let hexData1 = [];
    let hexData2 = [];
    let hexData3 = [];
    let hexData4 = [];
    hexData1.push(numHex.match(/.{4}/g));

    for (let i = 0; i < hexData1[0].length; i++) {
        hexData2.push(`(${hexData1[0][i].charAt(0)} x 2 <sup class='garis'>3</sup>) + (${hexData1[0][i].charAt(1)} x 2 <sup class='garis'>2</sup>) + (${hexData1[0][i].charAt(2)} x 2 <sup class='garis'>1</sup>) + (${hexData1[0][i].charAt(3)} x 2 <sup class='garis'>0</sup>)`);
        hexData3.push(`${hexData1[0][i].charAt(0) * pangkatBil(2,3)} + ${hexData1[0][i].charAt(1) * pangkatBil(2,2)} +  ${hexData1[0][i].charAt(2) * pangkatBil(2,1)} + ${hexData1[0][i].charAt(3) * pangkatBil(2,0)}`);
        hexData4.push(hexData1[0][i].charAt(0) * pangkatBil(2,3) + hexData1[0][i].charAt(1) * pangkatBil(2,2) + hexData1[0][i].charAt(2) * pangkatBil(2,1) + hexData1[0][i].charAt(3) * pangkatBil(2,0));
    }


    binOktalNum3.innerHTML = binData1.slice().join('<span class="garis"> | </span>')+'<br><br>'+"<details><summary class='info-text'>Bagi Bilangan :</summary><div class='info-text'>Bagi setiap bilangan dengan pembagian modulus dan kurangkan hasil dengan bilangan kemudia bagi dengan 2 , lakukan terus sampai angka menjadi 0 'nol' , jangan lupa memisah hasil modulus.</div></details>"+
    binData3.join("<hr>")+'<br>'+"<details class='kamui'><summary>Pecah Binner :</summary><div class='info-text'>Pecah bilangan binner dari kanan ke kiri setiap 3 bilangan jika bilangan binner kekurangan 3 bilangan silakan masukkan '0' dipaling kiri agar dapat terbentuk kelipatan 3.</div></details>"+
    binData2.slice().join('<span class="garis"> | </span>') + '<br><br>' + "<span class='garis opacity'>Hasil Binner :</span><br>"+
    hexData1[0].join('') + "<sub class='garis'>2</sub>"+'<br><br>' +"<details><summary>Kumpulkan Setiap 4 Bilangan</summary><div class='info-text'>Bagi jumlah character angka menjadi 4 bilangan dari kanan ke kiri jika kekurangan jumlah karakter angka tambahkan nilai nol '0' dibelakanganya sampai berjumlah 4 character.</div></details>"+
    hexData1[0].slice().join('<span class="garis"> | </span>') + '<br><br>' + "<details><summary>Kali 2 dengan pangkat :</summary><div class='info-text'>Kali setiap kumpulan bilangan tersebut dengan 2 yang diberi pangkat dengan urutan dari kanan ke kiri, ingat kumpulan bilangan adalah terpisah.</div></details>"+
    hexData2.slice().join('<span class="garis"> | </span>') + '<br><br>' + "<details><summary>Jumlahkan hasil untuk Hexadesimal</summary><div class='info-text'>Untuk mendapatkan nilai Hexadesimal tambahkan setiap bilangan yang berada didalam kumpulan bilangan dan ingat setiap kumpulan bilangan adalah terpisah.</div></details>"+
    hexData3.slice().join('<span class="garis"> | </span>') +"<br><br><details><summary>Perhatikan setiap angka</summary><div class='info-text'>Setiap bilangan berdiri dari satu kesatuan terpisah yang akan membentuk nilai hexadesimal hati-hati dalam menggabungkan ingat tabel berikut. A = 10 , B = 11, C = 12 , D = 13 , E = 14 , F = 15</div></details>"+
    hexData4.slice().join('<span class="garis"> | </span>') + `<br><br>` +
    "<span class='garis opacity'>Hasil Desimal :</span><br>" +'<span class="font-big">'+hex.value + '</span><sub>16</sub>';
}


//       Rules Desimal -------------------------------------------------------------------------------------------------------
function desimalRules(num) {
    rules.innerHTML = '';

    // Oktal ke Binner 
    let getA = document.createElement('div');
    let a1 = document.createElement('div');
    let a2 = document.createElement('div');
    let a5 = document.createElement("p");
    let a6 = document.createElement("h3");
    a5.innerHTML = num + ' <sub> (10)</sup>';
    a6.innerHTML = "Desimal    ->    Binner";
    getA.classList.add('pemisah');
    a1.classList.add('perkalian');
    a2.classList.add('perkalian');
    a1.appendChild(a6);
    a1.appendChild(a5);
    rules.appendChild(getA);
    getA.appendChild(a1);
    getA.appendChild(a2);

    let binOktalNum1 = document.getElementsByClassName('perkalian')[1];
    let BinData1 = [];
    let BinData2 = [];
    let BinData3 = [];
    let BinData4 = [];
    function calcBin(angka) {
        angka = parseInt(angka);
        BinData1.push(angka);
        BinData2.push(angka % 2);
        let hasil = Math.floor(angka / 2);
        BinData3.push(hasil);
        if (angka < 2) {

        } else {
            calcBin(hasil);
        }
    }
    calcBin(num);

    for (let i = 0; i < BinData1.length; i++) {
        BinData4.push(`${BinData1[i]} ÷ 2 = ${BinData3[i]} sisa bagi adalah <span class="garis"> ${BinData2[i]}</span>`);        
    }
    binOktalNum1.innerHTML = "<details class='kamui'><summary class='info-text'>Bagi Bilangan sampai '0' nol :</summary><div class='info-text'>Bagi hasil bilangan dengan pembagian modulus 2 jika angka tidak menunjukan nol , kurangankan nilai hasil modulus dengan bilangan yang kita punya , terus ulangi sampai nilai menunjukkan nilai nol '0'.</div></details>"+
    BinData4.slice().join('<br>') + '<br><br>' + 
    '<span class="garis opacity">Urutkan sisa bagi dari bawah ke atas untuk mendapatkan Binner </span>' +'<br>' +
    bin.value + ' <sub class="garis">2</sub>';


    // Desimal ke Oktal
    let getB = document.createElement('div');
    let b1 = document.createElement('div');
    let b2 = document.createElement('div');
    let b5 = document.createElement("p");
    let b6 = document.createElement("h3");
    b5.innerHTML = num + ' <sub> (10)</sup>';
    b6.innerHTML = "Desimal    ->    Oktal";
    getB.classList.add('pemisah');
    b1.classList.add('perkalian');
    b2.classList.add('perkalian');
    b1.appendChild(b6);
    b1.appendChild(b5);
    rules.appendChild(getB);
    getB.appendChild(b1);
    getB.appendChild(b2);

    let binOktalNum2 = document.getElementsByClassName('perkalian')[3];
    let desOktal = [];
    let desOktal1 = [];
    let desOktal2 = [];
    let desOktal3 = [];

    function bagiOktal(angka) {
        angka = parseInt(angka);
        desOktal.push(angka);
        desOktal1.push(angka % 8);
        let hasil = Math.floor(angka / 8);
        desOktal2.push(hasil);

        if (angka < 8) {}else{bagiOktal(hasil);}

    }
    bagiOktal(num);
    for (let i = 0; i < desOktal.length; i++) {
        desOktal3.push(`${desOktal[i]} ÷ 8 = ${desOktal2[i]} sisa bagi adalah <span class='garis'>${desOktal1[i]}</span>`);  
    }
    binOktalNum2.innerHTML = "<details class='kamui'><summary class='info-text'>Bagi Bilangan Sampai nol '0' :</summary><div class='info-text'>Bagi hasil bilangan dengan pembagian modulus 8 jika angka tidak menunjukan nol , kurangankan nilai hasil modulus dengan bilangan yang kita punya , terus ulangi sampai nilai menunjukkan nilai nol '0'.</div></details>"+
    desOktal3.slice().join('<br>') + '<br><br>' + '<span class="garis opacity">Urutkan sisa bagi dari bawah ke atas untuk mendapatkan Oktal</span>' +'<br>'+ 
    okt.value + ' <sub>(8)</sub>';

    // Desimal Ke Hexadesimal
    let getC = document.createElement('div');
    let c1 = document.createElement('div');
    let c2 = document.createElement('div');
    let c5 = document.createElement("p");
    let c6 = document.createElement("h3");
    c5.innerHTML = num + ' <sub> (10)</sup>';
    c6.innerHTML = "Desimal    ->    Hexadesimal";
    getC.classList.add('pemisah');
    c1.classList.add('perkalian');
    c2.classList.add('perkalian');
    c1.appendChild(c6);
    c1.appendChild(c5);
    rules.appendChild(getC);
    getC.appendChild(c1);
    getC.appendChild(c2);

    let binOktalNum3 = document.getElementsByClassName('perkalian')[5];
    let desData = [];
    let desData1 = [];
    let desData2 = [];
    let desData3 = [];
    function desOpera(angka) {
        angka = parseInt(angka);
        desData.push(angka);
        desData1.push(angka % 16);
        let hasil = Math.floor(angka / 16);
        desData2.push(hasil);

        if (angka < 16) {}else{desOpera(hasil);}

    }
    desOpera(num);
    for (let i = 0; i < desData.length; i++) {
        desData3.push(`${desData[i]} ÷ 16 = ${desData2[i]} sisa bagi adalah <span class='garis'>${desData1[i]}</span>`);
    }
    binOktalNum3.innerHTML = "<details class='kamui'><summary class='info-text'>Penjelasan :</summary><div class='info-text'>Bagi hasil bilangan dengan pembagian modulus 16 jika angka tidak menunjukan nol , kurangankan nilai hasil modulus dengan bilangan yang kita punya , terus ulangi sampai nilai menunjukkan nilai nol '0'.</div></details>"+
    desData3.slice().join('<br>') + "<br><br><details class='kamui'><summary class='info-text'>Urutkan Sisa Bagi :</summary><div class='info-text'>Urutkan sisa bagi dari bawah ke atas untuk mendapatkan Desimal , ingat!! A = 10, B = 11, C = 12, D = 13, E = 14, F = 15</div></details>"+
    `${desData1.reverse().join('<span class="garis"> | </span>')}`+'<br><br>'+ "<span class='garis opacity'>Hasil Desimal ke Hexadesimal :</span><br>"+
    hex.value + '</span> <sub>(8)</sub>';
}


// rules Hexadecimal =================================================================================================================
function hexRules(num) {
    rules.innerHTML = '';
    let numData = [];
    let numData1 = [];
    let numData2 = [];
    for (let i = 0; i < num.length; i++) {
        numData.push(num.charAt(i));
        numData1.push(num.charAt(i));
        numData2.push(num.charAt(i));
    }
    numData.forEach((part,index) => {
        switch (part) {
            case 'a':
                numData[index] = '10';
                numData2[index] = 'a = 10';
                break;
            case 'b':
                numData[index] = '11';
                numData2[index] = 'b = 11';
                break;
            case 'c':
                numData2[index] = 'c = 12';
                numData[index] = '12';
                break;
            case 'd':
                numData2[index] = 'd = 13';
                numData[index] = '13';
                break;
            case 'e':
                numData2[index] = 'e = 14';
                numData[index] = '14';
                break;
            case 'f':
                numData2[index] = 'f = 15';
                numData[index] = '15';
                break;
        };
    });

    let numData3 = [];
    let modusBin = [];
    numData.forEach((p,i) => {
        let modus = [];
        let bagi = [];
        let number = [];
        let realModus = [];
        function calcBin(angka) {
            angka = parseInt(angka);
            number.push(angka);
            modus.push(angka % 2);
            let hasil = Math.floor(angka / 2);
            bagi.push(hasil);
    
            if (angka < 2) {}else{calcBin(hasil);}
    
        }
        calcBin(numData[i]);
        for (let u = modus.length- 1; u>=0; u--) {
            realModus.push(modus[u]);
        }
        let respect = [];
        for (let u = 0; u < bagi.length; u++) {
            respect.push(`${number[u]} : 2 = ${bagi[u]} sisa bagi adalah <span class="garis"> ${modus[u]} </span><br>`);
        }
        let conArray = respect.join('');
        let conMod = realModus.join('');
        numData3.push(conArray);
        modusBin.push(conMod);
    });
    modusBin.forEach((p,i) =>{ 
        switch (p.length) {
            case 1:
                modusBin[i] = '000' + p;
                break;
            case 2:
                modusBin[i] = '00' + p;
                break;
            case 3:
                modusBin[i] = '0' + p;
                break;
        }
    });
    
    // Hexadesimal ke Binner
    let getA = document.createElement('div');
    let a1 = document.createElement('div');
    let a2 = document.createElement('div');
    let a5 = document.createElement("p");
    let a6 = document.createElement("h3");
    a5.innerHTML = num + ' <sub> (16)</sup>';
    a6.innerHTML = "Hexadesimal    ->    Binner";
    getA.classList.add('pemisah');
    a1.classList.add('perkalian');
    a2.classList.add('perkalian');
    a1.appendChild(a6);
    a1.appendChild(a5);
    rules.appendChild(getA);
    getA.appendChild(a1);
    getA.appendChild(a2);

    let binOktalNum1 = document.getElementsByClassName('perkalian')[1];
    binOktalNum1.innerHTML = numData2.join('<span class="garis"> | </span>') + "<br><br>" + "<details class='kamui'><summary class='info-text'>Bagi Setiap Bilangan :</summary><div class='info-text'>Bagi setiap nilai yang telah dipisah dengan 2 sebagai format dari binner, bagi terus nilai sampai tidak bisa di bagi dengan 2 dan jika terdapat selisih sisa bagi ambil nilai tersebut dan keluarkan.</div></details>"+
    numData3.join('<hr>') + "<br><br>" + "<details class='kamui'><summary class='info-text'>Ambil Biner :</summary><div class='info-text'>Ambil 4 bilangan di setiap bilangan pada hasil sisa bagi dan pastikan berjumlah 4 bilangan jika kurang dari 4 kamu bisa menambahkan nilai 0 sampai 4 bilangan terpenuhi untuk mendapatkan nilai binner.</div></details>"+
    modusBin.join('<span class="garis"> | </span>') + "<br><br>" + "<span class='garis opacity'>Sekarang adalah hasil binner dari Hexadesimal ini jika di ujung kiri terdapat nol '0' kamu bisa eleminasi nol tersebut atau ikut sertakan.</span>"+"<br>"+ 
    bin.value.replace(/\s/g, '') + "<sub class='garis'>2</sub>";

    // Hexadesimal ke Oktal
    let getB = document.createElement('div');
    let b1 = document.createElement('div');
    let b2 = document.createElement('div');
    let b5 = document.createElement("p");
    let b6 = document.createElement("h3");
    b5.innerHTML = num + ' <sub> (16)</sup>';
    b6.innerHTML = "Hexadesimal    ->    Oktal";
    getB.classList.add('pemisah');
    b1.classList.add('perkalian');
    b2.classList.add('perkalian');
    b1.appendChild(b6);
    b1.appendChild(b5);
    rules.appendChild(getB);
    getB.appendChild(b1);
    getB.appendChild(b2);

    let binOktalNum2 = document.getElementsByClassName('perkalian')[3];

    let hexOkt = [];
    let hexOkt1 = bin.value.replace(/\s/g, '');
        if (hexOkt1.length % 3 == 1) {
            hexOkt1 = "00" + hexOkt1;
        }
        if (hexOkt1.length % 3 === 2) {
            hexOkt1 = "0" + hexOkt1;
        }

    hexOkt.push(hexOkt1.match(/.{3}/g));

    let hexOkt2 = [];
    let oktalData = okt.value;
    for (let i = 0; i < oktalData.length; i++) {
        hexOkt2.push(oktalData.charAt(i));
    };
    let hexOkt3 = [];
    hexOkt[0].forEach((p, i) => {
        let reverse1 = [];
        for (let u = 0; u < p.length; u++) {
            reverse1.push(u);
        }
            hexOkt3.push(`(${p.charAt(2)} x 2<sup class='garis'>${reverse1[0]}</sup> = <span class="garis">${p.charAt(2) * pangkatBil(2,reverse1[0])}</span> ) + (${p.charAt(1)} x 2<sup class='garis'>${reverse1[1]}</sup> = <span class="garis">${p.charAt(1) * pangkatBil(2,reverse1[1])}</span>) + (${p.charAt(0)} x 2<sup class='garis'>${reverse1[2]}</sup> = <span class="garis">${p.charAt(0) * pangkatBil(2,reverse1[2])}</span>)`);
    });
    binOktalNum2.innerHTML = numData2.join('<span class="garis"> | </span>') + "<br><br>" + "<details class='kamui'><summary class='info-text'>Bagi Setiap Nilai :</summary><div class='info-text'>Bagi setiap nilai yang telah dipisah dengan 2 sebagai format dari binner, bagi terus nilai sampai tidak bisa di bagi dengan 2 dan jika terdapat selisih sisa bagi ambil nilai tersebut dan keluarkan</div></details>"+
    numData3.join('<hr>') + "<br><br>" +  
    numData2.join('<span class="garis"> | </span>') + "<br><br>"+ "<details class='kamui'><summary class='info-text'>Menjadi Binner :</summary><div class='info-text'>Ambil 4 bilangan di setiap bilangan pada hasil sisa bagi dan pastikan berjumlah 4 bilangan jika kurang dari 4 kamu bisa menambahkan nilai 0 sampai 4 bilangan terpenuhi untuk mendapatkan nilai binner</div></details>"+
    modusBin.join('<span class="garis"> | </span>') + "<br><br>" + "<details class='kamui'><summary class='info-text'>Binner :</summary><div class='info-text'>Sekarang adalah hasil binner dari Hexadesimal ini jika di ujung kiri terdapat nol '0' kamu bisa eleminasi nol tersebut atau ikut sertakan.</div></details>"+
    bin.value.replace(/\s/g, '')+"<sub class='garis'>2</sub>" + "<br><br>" + "<details class='kamui'><summary class='info-text'>Pecah Binner :</summary><div class='info-text'>Pecah bilangan binner dari kanan ke kiri setiap 3 bilangan jika bilangan binner kekurangan 3 bilangan silakan masukkan '0' dipaling kiri agar dapat terbentuk kelipatan 3.</div></details>"+
    hexOkt[0].join('<span class="garis"> | </span>') + "<br><br>" + "<details class='kamui'><summary class='info-text'>Kali semua Bilangan :</summary><div class='info-text'>Setiap kumpulan bilangan angkat dikali dengan 2 dengan urutan angka sebagai pangkat dari 2, perkalian dilakukan dari kanan ke kiri.</div></details>"+
    hexOkt3.join('<span class="garis"> | </span>') +"<br><br>"+ "<span class='garis opacity'>Hasil Hexadesimal ke Oktal :</span>"+ "<br>"+
    hexOkt2.join('<span class="garis"> | </span>') + "<br><br>" +
    hexOkt2.join('') + '<sub class="garis">8</sub>';

    // Rumus Hexadesimal ke Desimal
    let getC = document.createElement('div');
    let c1 = document.createElement('div');
    let c2 = document.createElement('div');
    let c5 = document.createElement("p");
    let c6 = document.createElement("h3");
    c5.innerHTML = num + ' <sub> (10)</sup>';
    c6.innerHTML = "Hexadesimal    ->    Desimal";
    getC.classList.add('pemisah');
    c1.classList.add('perkalian');
    c2.classList.add('perkalian');
    c1.appendChild(c6);
    c1.appendChild(c5);
    rules.appendChild(getC);
    getC.appendChild(c1);
    getC.appendChild(c2);

    let binOktalNum3 = document.getElementsByClassName('perkalian')[5];
    let desData = [];
    let desData1 = [];
    let revHex = [];
    for (let u = num.length- 1; u>=0; u--) {
        revHex.push(u)
    }
    numData.forEach((p,i) => {
        desData.push(`(${p} x 16 <sup class='garis'>${revHex[i]}</sup>)`);
        desData1.push(p * pangkatBil(16,revHex[i]));
    });
    binOktalNum3.innerHTML = numData2.join('<span class="garis"> | </span>')+"<br><br>" + "<details class='kamui'><summary class='info-text'>Kali dengan Pangkat :</summary><div class='info-text'>Kali setiap bilangan dengan 16 dan beri pangkat sesuai urutan dari kanan ke kiri dimulai dengan nol '0'.</div></details>" +
    desData.join('<span class="garis"> + </span>') + "<br><br>" + "<details class='kamui'><summary class='info-text'>Jumlahkan Semua Hasil :</summary><div class='info-text'>Untuk mendapatkan nilai Desimal yang kita inginkan tambahkan semua hasil nilai tersebut maka akan menghasikan sebuah nilai desimal.</div></details>"+ 
    desData1.join('<span class="garis"> + </span>') + "<br><br>" + "<span class='garis opacity'>Hasil Hexadesimal ke Desimal :</span>"+ "<br>"+
    des.value + "<sub class='garis'>10</sub>"
    ;
}

function pangkatBil(a,b) {
    return a**b;
}