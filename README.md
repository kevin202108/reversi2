<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reversi</title>
</head>
<style>
  h1 {
    font-size: 50px;
    text-align: center;
  }
  table {
    margin: auto; widt
    border: solid 3px;
    border-collapse: collapse;
  }
  table th,
  table td {
    border: solid 3px #000;
    text-align: center;
  }
  button {
    background-color: rgb(182, 230, 200);
    border: none;
    color: black;
    padding: 5px 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    z-index:100;
  }
  .clear{
    margin: 5px;
    border: 1px rgb(0, 0, 0);
    padding: 10px 10px;
    border-radius: 5px;
  }
  /*button:hover {
    background-color: #4CAF50;
  } */
  div{
    float: left;
    z-index:-100;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: rgb(182, 230, 200);
  }
  .stone33{
    background-color: white;
  }
  .stone44{
    background-color: white;
  }
  .stone34{
    background-color: black;
  }
  .stone43{
    background-color: black;
  }
</style>
<body onload="init()">
  <h1>Reversi</h1>
  <button class="clear" onclick="init()"><b>clear</b></button>
  <table>
    <tbody>
      <tr>
          <td></td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td>5</td>
          <td>6</td>
          <td>7</td>
          <td>8</td>
      </tr>
      <tr>
          <td>1</td>
          <td><button onclick="stoneOnclick(0,0)" ><div id="stone00"></div></button></td>
          <td><button onclick="stoneOnclick(0,1)" ><div id="stone01"></div></button></td>
          <td><button onclick="stoneOnclick(0,2)" ><div id="stone02"></div></button></td>
          <td><button onclick="stoneOnclick(0,3)" ><div id="stone03"></div></button></td>
          <td><button onclick="stoneOnclick(0,4)" ><div id="stone04"></div></button></td>
          <td><button onclick="stoneOnclick(0,5)" ><div id="stone05"></div></button></td>
          <td><button onclick="stoneOnclick(0,6)" ><div id="stone06"></div></button></td>
          <td><button onclick="stoneOnclick(0,7)" ><div id="stone07"></div></button></td>
      </tr>
      <tr>
          <td>2</td>
          <td><button onclick="stoneOnclick(1,0)" ><div id="stone10"></div></button></td>
          <td><button onclick="stoneOnclick(1,1)" ><div id="stone11"></div></button></td>
          <td><button onclick="stoneOnclick(1,2)" ><div id="stone12"></div></button></td>
          <td><button onclick="stoneOnclick(1,3)" ><div id="stone13"></div></button></td>
          <td><button onclick="stoneOnclick(1,4)" ><div id="stone14"></div></button></td>
          <td><button onclick="stoneOnclick(1,5)" ><div id="stone15"></div></button></td>
          <td><button onclick="stoneOnclick(1,6)" ><div id="stone16"></div></button></td>
          <td><button onclick="stoneOnclick(1,7)" ><div id="stone17"></div></button></td>
      </tr>
      <tr>
          <td>3</td>
          <td><button onclick="stoneOnclick(2,0)" ><div id="stone20"></div></button></td>
          <td><button onclick="stoneOnclick(2,1)" ><div id="stone21"></div></button></td>
          <td><button onclick="stoneOnclick(2,2)" ><div id="stone22"></div></button></td>
          <td><button onclick="stoneOnclick(2,3)" ><div id="stone23"></div></button></td>
          <td><button onclick="stoneOnclick(2,4)" ><div id="stone24"></div></button></td>
          <td><button onclick="stoneOnclick(2,5)" ><div id="stone25"></div></button></td>
          <td><button onclick="stoneOnclick(2,6)" ><div id="stone26"></div></button></td>
          <td><button onclick="stoneOnclick(2,7)" ><div id="stone27"></div></button></td>
      </tr>
      <tr>
          <td>4</td>
          <td><button onclick="stoneOnclick(3,0)" ><div id="stone30"></div></button></td>
          <td><button onclick="stoneOnclick(3,1)" ><div id="stone31"></div></button></td>
          <td><button onclick="stoneOnclick(3,2)" ><div id="stone32"></div></button></td>
          <td><button onclick="stoneOnclick(3,3)" ><div id="stone33" class="stone33"></div></button></td>
          <td><button onclick="stoneOnclick(3,4)" ><div id="stone34" class="stone34"></div></button></td>
          <td><button onclick="stoneOnclick(3,5)" ><div id="stone35"></div></button></td>
          <td><button onclick="stoneOnclick(3,6)" ><div id="stone36"></div></button></td>
          <td><button onclick="stoneOnclick(3,7)" ><div id="stone37"></div></button></td>
      </tr>
      <tr>
          <td>5</td>
          <td><button onclick="stoneOnclick(4,0)" ><div id="stone40"></div></button></td>
          <td><button onclick="stoneOnclick(4,1)" ><div id="stone41"></div></button></td>
          <td><button onclick="stoneOnclick(4,2)" ><div id="stone42"></div></button></td>
          <td><button onclick="stoneOnclick(4,3)" ><div id="stone43" class="stone43""></div></button></td>
          <td><button onclick="stoneOnclick(4,4)" ><div id="stone44" class="stone44"></div></button></td>
          <td><button onclick="stoneOnclick(4,5)" ><div id="stone45"></div></button></td>
          <td><button onclick="stoneOnclick(4,6)" ><div id="stone46"></div></button></td>
          <td><button onclick="stoneOnclick(4,7)" ><div id="stone47"></div></button></td>
      </tr>
      <tr>
          <td>6</td>
          <td><button onclick="stoneOnclick(5,0)" ><div id="stone50"></div></button></td>
          <td><button onclick="stoneOnclick(5,1)" ><div id="stone51"></div></button></td>
          <td><button onclick="stoneOnclick(5,2)" ><div id="stone52"></div></button></td>
          <td><button onclick="stoneOnclick(5,3)" ><div id="stone53"></div></button></td>
          <td><button onclick="stoneOnclick(5,4)" ><div id="stone54"></div></button></td>
          <td><button onclick="stoneOnclick(5,5)" ><div id="stone55"></div></button></td>
          <td><button onclick="stoneOnclick(5,6)" ><div id="stone56"></div></button></td>
          <td><button onclick="stoneOnclick(5,7)" ><div id="stone57"></div></button></td>
      </tr>
      <tr>
          <td>7</td>
          <td><button onclick="stoneOnclick(6,0)" ><div id="stone60"></div></button></td>
          <td><button onclick="stoneOnclick(6,1)" ><div id="stone61"></div></button></td>
          <td><button onclick="stoneOnclick(6,2)" ><div id="stone62"></div></button></td>
          <td><button onclick="stoneOnclick(6,3)" ><div id="stone63"></div></button></td>
          <td><button onclick="stoneOnclick(6,4)" ><div id="stone64"></div></button></td>
          <td><button onclick="stoneOnclick(6,5)" ><div id="stone65"></div></button></td>
          <td><button onclick="stoneOnclick(6,6)" ><div id="stone66"></div></button></td>
          <td><button onclick="stoneOnclick(6,7)" ><div id="stone67"></div></button></td>
      </tr>
      <tr>
          <td>8</td>
          <td><button onclick="stoneOnclick(7,0)" ><div id="stone70"></div></button></td>
          <td><button onclick="stoneOnclick(7,1)" ><div id="stone71"></div></button></td>
          <td><button onclick="stoneOnclick(7,2)" ><div id="stone72"></div></button></td>
          <td><button onclick="stoneOnclick(7,3)" ><div id="stone73"></div></button></td>
          <td><button onclick="stoneOnclick(7,4)" ><div id="stone74"></div></button></td>
          <td><button onclick="stoneOnclick(7,5)" ><div id="stone75"></div></button></td>
          <td><button onclick="stoneOnclick(7,6)" ><div id="stone76"></div></button></td>
          <td><button onclick="stoneOnclick(7,7)" ><div id="stone77"></div></button></td>
      </tr>

    </tbody>
  </table>
  <script src="main.js"></script>
</body>
</html>
