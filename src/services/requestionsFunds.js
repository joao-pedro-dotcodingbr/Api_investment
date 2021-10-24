const { text } = require('express');
const puppeteer = require('puppeteer');
const pageHomeList = require('../configs/main')
const Url = process.env.Url || 'http://localhost:3000'
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

exports.Search = async (name) =>{

    try {

        const browser = await puppeteer.launch({headless:false, slowMo:1200});
        const page = await browser.newPage();
    
        await page.goto(pageHomeList.IndexWeb + 'fundos-imobiliarios/'+ name);
    
        // funds: .top-info.d-flex.flex-wrap.justify-between.mb-3.mb-md-5
        // acões : .top-info.has-special.d-flex.justify-between.flex-wrap
        const result = await page.evaluate(async(link , nameFunds)=>{

            //#region verification error path
            const titleDocument = document.title
            if(titleDocument == 'OPS. . .Não encontramos o que você está procurando - Status Invest'){
                return {error:'error path'}
            }
            //#endregion

            const array = {
    
                main:[],
                payments:[]
        
                
            }
    
            //#region requestion values top page

            const indexContainer = document.querySelector('.top-info.d-flex.flex-wrap.justify-between.mb-3.mb-md-5')
    
            const titles = indexContainer.querySelectorAll('.title.m-0')
            const values = indexContainer.querySelectorAll('.value')
            const subContainerTitles = indexContainer.querySelectorAll('.d-flex.justify-between')
    
            array.main.push({
    
                currentValue:[
    
                   value=values[0].innerText,
                    subValue={
    
                        icon: indexContainer.querySelector('.material-icons.fs-3').innerText, 
                        value: indexContainer.querySelector('.v-align-middle').innerText
        
                    }
    
                ],
    
                miniValue:[
    
                    title = titles[1].innerText,
                    value = values[1].innerText,
                    subTitle = {
    
                       title: subContainerTitles[0].querySelector('.sub-title').innerText,
                       value: subContainerTitles[0].querySelector('.sub-value').innerText
    
                    }
    
    
                ],
    
               maxValue:[

                    title = titles[2].innerText,
                    value = values[2].innerText,
                    subTitle = {

                    title: subContainerTitles[1].querySelector('.sub-title').innerText,
                    value: subContainerTitles[1].querySelector('.sub-value').innerText

                    }

               ],

               dv:[

                    title = titles[3].innerText,
                    value = values[3].innerText,
                    subTitle = {

                    title: subContainerTitles[2].querySelector('.sub-title').innerText,
                    value: subContainerTitles[2].querySelector('.sub-value').innerText

                    }

               ],

               appreciation:[

                title = titles[4].innerText,
                value = values[4].innerText,
                subTitle = {

                title: subContainerTitles[3].querySelector('.sub-title').innerText,
                value: subContainerTitles[3].querySelector('.sub-value').innerText

                }

               ]
            
            })

            //#endregion

            //#region  Scroll Navigation
            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            for(let index = 0; index < 3000; index++){
                await sleep(1)
                await window.scrollTo(0,index)
            
            }        

            //#endregion
           

            //#region TablePayments

            const Divpagination = document.querySelectorAll('.pagination.mb-0')

            const pagination = Divpagination[0].querySelectorAll('li')
         
            const numericPagination = pagination.length -2

            
            if(numericPagination == 1){

                array.payments.push({ 

                    page:numericPagination,
                    next: null,
    
                })

            }else{

                array.payments.push({ 

                    page:numericPagination,
                    next: link + '/funds/payments/' + nameFunds + '/2',
    
                })

            }
            const tablePayments = document.querySelector('tbody')

            for (let index = 0; index < tablePayments.querySelectorAll('tr').length; index++) {
                let numeric = index + 1
            
                array.payments.push(

                    {

                    date: tablePayments.querySelector("tr:nth-child("+ numeric +") > td:nth-child(3)").innerText,
                    value: tablePayments.querySelector("tr:nth-child("+numeric+") > td:nth-child(4)").innerText

                    }
                    
                )
                

            }


            //#endregion
    
            return array

        }, Url , name)

        await page.close()
        await browser.close()

        return await result
        
    } catch (error) {

        console.log(erro)
        
    }


}