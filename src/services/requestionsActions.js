const puppeteer = require('puppeteer');
const pageHomeList = require('../configs/main')
const Url = process.env.Url || 'http://localhost:3000'

exports.GetAllList = async () =>{

    try {

        const browser = await puppeteer.launch({headless:false, slowMo:1400});
        const page = await browser.newPage();
        await page.goto(pageHomeList.IndexWeb + 'acoes/busca-avancada');

       
        //#region  apertando o botão para fazer a pesquisa
        await page.evaluate(() => {
    
            document.querySelector('.find.waves-effect.waves-light.btn.btn-large.btn-main.fw-700.fs-3.pl-2.pr-2.pl-sm-3.pr-sm-3.tooltipped').click();
        
        });

        //#endregion

        //#region click button TODOS (button Pagination)

        await page.evaluate(() => {
    
        const selectDivsWrapper = document.querySelectorAll('.select-wrapper')

        const buttonsPagination = selectDivsWrapper[4].querySelectorAll('li')

        buttonsPagination[2].click()
        

        });

        //#endregion

        // get table 
        const result = await page.evaluate(()=> {

        const tab =  document.querySelectorAll('.list') //ticker waves-effect

        const array = {

            names:[],

            values:[],

            gest:[],

            dy:[],

            pVP:[],

            liqui:[],

            patri:[]
            
        }


            for (let index = 0; index < tab[1].rows.length; index++) {

            array.names.push(tab[1].rows[index].cells[0].getElementsByClassName("ticker waves-effect")[0].innerText)
            array.values.push(tab[1].rows[index].cells[1].innerText)
            array.gest.push(tab[1].rows[index].cells[2].innerText)
            array.dy.push(tab[1].rows[index].cells[3].innerText)
            array.pVP.push(tab[1].rows[index].cells[4].innerText)
            array.liqui.push(tab[1].rows[index].cells[5].innerText)
            array.patri.push(tab[1].rows[index].cells[10].innerText)
            

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

        const browser = await puppeteer.launch({headless:false, slowMo:800});
        const page = await browser.newPage();
    
        await page.goto(pageHomeList.IndexWeb + 'acoes/'+ name);
    
        const result = await page.evaluate(async(link ,nameActions)=>{

            //#region verification error path
                        const titleDocument = document.title
                        if(titleDocument == 'OPS. . .Não encontramos o que você está procurando - Status Invest'){
                            return {error:'not we found fund name'}
                        }
                        //#endregion
             
            const array = {
    
                main:[],
                Indicators:{

                    valuation:{

                        dy: '',
                        pl: '',
                        peg: '',
            
                        p_pv: '',
                        ev_ebitda: '',
                        ev_ebit: '',
            
                        p_ebitda: '',
                        p_ebit: '',
                        vpa: '',
            
                        p_active: '',
                        lpa: '',
                        p_sr:'',
            
                        p_cap:'',
                        p_active_circ: ''

                    },
                    debt:{

                        div_net_pl:'',
                        net_debt_ebitda:'',
                        net_debt_ebit:'',
                        equity_assets:'',
                        liabilities_assets:'',
                        current_liquidity:'',

                    },
                    efficiency:{

                        gross_margin:'',
                        ebida_margin:'',
                        ebit_margin:'',
                        liquidity_margin:''

                    },
                    profitability:{

                        roe: "",
                        roa: "",
                        roic: "",
                        asser_turn: ""

                   },
                   growth:{

                        cagr_revenues_5_years:'',
                        cagr_profits_5_years:''

                   }

                },
                payments:[]
                
            }
    
            //#region requestion values top page
    
            const indexContainer = document.querySelector('.top-info.has-special.d-flex.justify-between.flex-wrap')
    
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

            for(let index = 0; index < 3500; index++){
                await sleep(1)
                await window.scrollTo(0,index)
            
            }        

            //#endregion

            //#region datails informations 

                const divValuation = document.querySelectorAll('.d-flex.flex-wrap.align-items-center.justify-start')
                const valuesValuations = divValuation[0].querySelectorAll('.value.d-block.lh-4.fs-4.fw-700')
                const valuesDebt = divValuation[1].querySelectorAll('.value.d-block.lh-4.fs-4.fw-700')
                const valuesEfficiency = divValuation[2].querySelectorAll('.value.d-block.lh-4.fs-4.fw-700')
                const valuesProfitability = divValuation[3].querySelectorAll('.value.d-block.lh-4.fs-4.fw-700')
                const valuesGrowth = divValuation[4].querySelectorAll('.value.d-block.lh-4.fs-4.fw-700')
            
            //#region GET indicators 

                //#region  Valuations

                array.Indicators.valuation.dy = valuesValuations[0].innerText
                array.Indicators.valuation.pl = valuesValuations[1].innerText
                array.Indicators.valuation.peg = valuesValuations[2].innerText,
                array.Indicators.valuation. p_pv = valuesValuations[3].innerText,
                array.Indicators.valuation.ev_ebitda = valuesValuations[4].innerText,
                array.Indicators.valuation.ev_ebit = valuesValuations[5].innerText,
                array.Indicators.valuation.p_ebitda = valuesValuations[6].innerText,
                array.Indicators.valuation.p_ebit = valuesValuations[7].innerText,
                array.Indicators.valuation.vpa = valuesValuations[8].innerText,
                array.Indicators.valuation.p_active = valuesValuations[9].innerText,
                array.Indicators.valuation.lpa = valuesValuations[10].innerText,
                array.Indicators.valuation.p_sr =valuesValuations[11].innerText,
                array.Indicators.valuation.p_cap =valuesValuations[12].innerText,
                array.Indicators.valuation.p_active_circ = valuesValuations[13].innerText

                //#endregion

                //#region indicators debt
            
                array.Indicators.debt.div_net_pl = valuesDebt[0].innerText
                array.Indicators.debt.net_debt_ebitda = valuesDebt[1].innerText
                array.Indicators.debt.net_debt_ebit = valuesDebt[2].innerText
                array.Indicators.debt.equity_assets = valuesDebt[3].innerText
                array.Indicators.debt.liabilities_assets = valuesDebt[4].innerText
                array.Indicators.debt.current_liquidity = valuesDebt[5].innerText

                //#endregion

                //#region EFFICIENCY

                array.Indicators.efficiency.gross_margin = valuesEfficiency[0].innerText
                array.Indicators.efficiency.ebida_margin = valuesEfficiency[1].innerText
                array.Indicators.efficiency.ebit_margin = valuesEfficiency[2].innerText
                array.Indicators.efficiency.liquidity_margin = valuesEfficiency[3].innerText

                //#endregion

                //#region profitability

                    array.Indicators.profitability.roe = valuesProfitability[0].innerText
                    array.Indicators.profitability.roa = valuesProfitability[1].innerText
                    array.Indicators.profitability.roic = valuesProfitability[2].innerText
                    array.Indicators.profitability.asser_turn = valuesProfitability[3].innerText


                //#endregion

                //#region growth

                    array.Indicators.growth.cagr_revenues_5_years = valuesGrowth[0].innerText
                    array.Indicators.growth.cagr_profits_5_years = valuesGrowth[1].innerText

                //#endregion

            //#endregion

            //#region  variables pagination Payments

            const Divpagination = document.querySelectorAll('.pagination.mb-0')

            const pagination = Divpagination[0].querySelectorAll('li')
         
            const numericPagination = pagination.length -2

            //#endregion

            //#region verification next Paginátion, if numeric page is equal 1
            if(numericPagination == 1){

                array.payments.push({ 

                    page:numericPagination,
                    next: null,
    
                })

            }else{

                array.payments.push({ 

                    page:numericPagination,
                    next: link + '/actions/payments/' + nameActions + '/2',
    
                })

            }

            //#endregion

            //#region GET table payments
            const tablePayments = document.querySelector('tbody')
            
             //https://developer.mozilla.org/pt-BR/docs/Web/CSS/:nth-child
            //const table = document.querySelector('tbody')
            //tablePayments.querySelector('tr:nth-child(1) > td:nth-child(2)').innerText
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
    
        }, Url ,name)

        await page.close()
        await browser.close()
    
        return result
        
    } catch (error) {

        console.log(erro)
        
    }

}

exports.ShowPagePayments = async (name , numericPage ) =>{

    try {

        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
    
        await page.goto(pageHomeList.IndexWeb + 'acoes/'+ name );

        // add variable: https://stackoverflow.com/questions/46088351/how-can-i-pass-variable-into-an-evaluate-function
        const result = await page.evaluate(async (selectPagination , link , nameAcoes ) =>{

            //#region verification error path
            const titleDocument = document.title
            if(titleDocument == 'OPS. . .Não encontramos o que você está procurando - Status Invest'){
                return {error:'error path'}
            }
            //#endregion
 
            const array = {

                numericPage:0 ,
                next:'',
                date:[]
    
            }

            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            // Scroll navigation
            for(let index = 0; index < 3000; index++){
                await sleep(1)
                await window.scrollTo(0,index)
               
            }
           
            //#region  get variables navigation Payments
            const Divpagination = document.querySelectorAll('.pagination.mb-0')
            
            const pagination = Divpagination[0].querySelectorAll('li')
         
            const numericPagination = pagination.length -2

            //#endregion

            array.numericPage = numericPagination

            //#region validations insert values pagination array 
            if(selectPagination > numericPagination){
                return {error:'sem histório'}
            }else{

                if(selectPagination == numericPagination){
                    array.next = null

                }else{
                    array.next = link + '/actions/payments/' + nameAcoes + '/' +(selectPagination + 1) 
                }

            }
            //#endregion

            pagination[selectPagination].click()
                        
            const tablePayments = document.querySelector('tbody')

                for (let index = 0; index < tablePayments.querySelectorAll('tr').length; index++) {
                    let numeric = index + 1
                
                    array.date.push(

                        {

                        date: tablePayments.querySelector("tr:nth-child("+ numeric +") > td:nth-child(3)").innerText,
                        value: tablePayments.querySelector("tr:nth-child("+numeric+") > td:nth-child(4)").innerText

                        }
                        
                    )  

                }

                return array

        }, numericPage , Url , name)

        await page.close()
        await browser.close()

        return result
               
    } catch (error) {
        console.log(error)
    }

}
