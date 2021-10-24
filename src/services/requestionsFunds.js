const { text } = require('express');
const puppeteer = require('puppeteer');
const pageHomeList = require('../configs/main')

exports.GetAllList = async () =>{

    try {

        const browser = await puppeteer.launch({headless:false, slowMo:800});
        const page = await browser.newPage();
        await page.goto(pageHomeList.IndexWeb + 'fundos-imobiliarios/busca-avancada');

        //#region  apertando o botão para fazer a pesquisa
        await page.evaluate(() => {
    
            document.querySelector('.find.waves-effect.waves-light.btn.btn-large.btn-main.fw-700.fs-3.pl-2.pr-2.pl-sm-3.pr-sm-3.tooltipped').click();
        
        });

        //#endregion

        //#region click button TODOS (button Pagination)

        await page.evaluate(() => {
    
        const selectDivsWrapper = document.querySelectorAll('.select-wrapper')

        const buttonsPagination = selectDivsWrapper[3].querySelectorAll('li')

        buttonsPagination[2].click()
        

        });

        //#endregion

        // get table 
        const result = await page.evaluate(()=> {

        const tab =  document.querySelectorAll('.list') //ticker waves-effect

        const array = {

            names:[],

            values:[],

           // gest:[],

            dy:[],

            pVP:[],

          //  liqui:[],

           // patri:[]
            
        }

            for (let index = 0; index < tab[1].rows.length; index++) {

                array.names.push(tab[1].rows[index].cells[0].getElementsByClassName("ticker waves-effect")[0].innerText)
                array.values.push(tab[1].rows[index].cells[1].innerText)
               // array.gest.push(tab[1].rows[index].cells[2].innerText)
                array.dy.push(tab[1].rows[index].cells[3].innerText)
                array.pVP.push(tab[1].rows[index].cells[4].innerText)
             //   array.liqui.push(tab[1].rows[index].cells[5].innerText)
             //   array.patri.push(tab[1].rows[index].cells[10].innerText)
            
            }

            return array

        })

        await page.close()
        await browser.close()
    
        return result

        
    } catch (error) {

        console.log(error)
        
    }

}
