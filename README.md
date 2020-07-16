# SimpleCalendar

<p align="center">
  <img src="https://github.com/ayusuke7/SimpleCalendar/blob/master/imgs/img01.png?raw=true" height="300px">
</p>

SimpleCalendar, biblioteca simples de calendario para sua aplicação Web React/JS.

## Funcionalidades!

  - Seleção de dias, mese e anos
  - Selecione ranges de datas
  - Suporte de idiomas (Inglês - en, Português - pt)
  - Nomes dos dias da semana (Full, Abrev. e Custom).
  - Symbolos HTML Code nos dias
  - Customização styles (Background, Font)

## Instalação

instação utilizando npm ou yarn
```sh
$ yarn add simple-calendar
or
$ npm install simple-calendar
```

## Importação:

  ```js
  import SimpleCalendar from "SimpleCalendar"; 
  ```
## Uso
```js
import React, { Component } from 'react';
import SimpleCalendar from 'simple-calendar';

class MyApp extends Component {
    states = {        
     dates: [
         "2020-01-01",
         "2020-01-02",
         { date: "2020-01-21", bgColor: '#fff' },
         { date: "2020-01-12", bgColor: '#f5ff' },         
     ]   
    };

  render() {
    return (
        <div className="container">
          <SimpleCalendar
                locale="pt"
                dates={[this.state.dates]}
                initDate={"2020-12-31"}
                weekNamesAbrv
                enableSelectDays
                enableSelectDateNow
                customWeekNames={["A", "B", "C", "D", "E", "F", "G"]}
                onClickPrev={data => console.log(data)}
                onClickNext={data => console.log(data)}
                onClickDay={data => console.log(data)}
             />
         </div>
      );
    }
 }
```

## Importação Symbols
```js
import Symbols, { getAll } from '@SimpleCalendar/utils/Symbols';
```
## Uso dos Symbolos <HTML Code />

Para a utilização dos Symbolos HTML Code é preciso montar um objeto para as datas nas quais sera apresentado o symbolo.

Ex:
```js
const dates = [
    { date: `2020-03-01`, icon: `Symbols.SNOWFLAKE`},
    { date: `2020-03-01`, icon: `<>&#9829;</>`},
];
```
[HTML Codes W3Schools](https://www.w3schools.com/html/html_symbols.asp)

## Props

|         Nome        	|                                    Descrição                                    	|    Padrão    	|   Tipo   	| Required 	| Retorno 	|
|:-------------------:	|:-------------------------------------------------------------------------------:	|:------------:	|:--------:	|:--------:	|:-------:	|
|        locale       	|    Idioma para os nomes de dias da semana e meses do ano não configura o UTC    	|      pt      	|  string  	|    no    	|   void  	|
|        dates        	|       Lista de datas para selecão inicial no calendário tipo "YYYY-MM-DD"       	|      []      	|   array  	|    no    	|   void  	|
|       initDate      	|    Data inicial para apresentação do Calendário, data atual como valor padrão   	| "YYYY-MM-DD" 	|  String  	|    no    	|   void  	|
|   enableSelectDays  	| Habilita a opção de selecionar os dias no calendário  e remover os selecionados 	|     false    	|  boolean 	|    no    	|   void  	|
| enableSelectDateNow 	|                    Habilita se o dia atual inicia selecionado                   	|     true     	|  boolean 	|    no    	|   void  	|
|   customWeekNames   	|     Customização nos nome dos dias das semana,  obrigatório 7 items (string)    	|      []      	|   array  	|    no    	|   void  	|
|    weekNamesAbrv    	|                   Abrevia os nomes das Semana para 3 caractere                  	|     false    	|  boolean 	|    no    	|   void  	|
|     onClickPrev     	|                     Callback para para o botão de Anterior <                    	|     null     	| function 	|    no    	|  object 	|
|     onClickNext     	|                     Callback para para o botão de Próximo >                     	|     null     	| function 	|    no    	|  object 	|
|      onClickDay     	|                   Callback para para o Click nos dias dos dias                  	|     null     	| function 	|    no    	|  object 	|


### Objeto de retorno para as funções de callback.

Obs: para os o callback das Arrows de Mes e Ano sempre retornará o dia 01, no caso do
onClickDay retorna o dia selecionado. 

```js 
    
    {
        date: "2020-04-14", 
        day: 14, 
        month: "Abril", 
        year: 2020, 
        cntDays: 30, 
        selects: [
            { date: "2020-03-01", ...props}
            { date: "2020-03-02", ...props}
            { date: "2020-03-03", ...props}
            "2020-02-15"
            "2020-03-24"
            "2020-04-14"
        ]
    }

```

# Desenvolvimento

### Licença
The MIT License.
**Free Software, Hell Yeah!**

### Autor
- ### Alexanre H / @ayusuke7

### Contribuções
- Contribui ai mestre (y) !!!
