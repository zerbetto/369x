var sec, genericDate, busSched, _3690, _3691;

function globalInit()
{
   genericDate = "01/01/2014 ",
   busSched = "",
   posNext = 0;
   sec = ":00";

   _3690 = ["05:00", "05:20", "05:40","05:50", "06:00", "06:10", "06:20",
            "06:30", "06:40", "06:50","07:00", "07:10", "07:20", "07:30",
            "07:40", "07:50", "08:00","08:10", "08:20", "08:30", "08:43",
            "08:56", "09:09", "09:22","09:35", "09:48", "10:01", "10:14",
            "10:27", "10:40", "10:53","11:06", "11:19", "11:32", "11:45",
            "11:58", "12:11", "12:24","12:37", "12:50", "13:03", "13:16",
            "13:29", "13:42", "13:55","14:08", "14:21", "14:34", "14:47",
            "15:00", "15:13", "15:26","15:30", "15:40", "15:50", "16:00",
            "16:10", "16:20", "16:30","16:40", "16:50", "17:00", "17:10",
            "17:20", "17:30", "17:40","17:50", "18:00", "18:10", "18:20",
            "18:30", "18:40", "18:50","19:00", "19:10", "19:30", "19:50",
            "20:10", "20:30", "20:50","21:10", "21:30", "21:50", "22:10",
            "22:30", "22:50", "23:20"];

   _3691 = ["06:45", "07:05", "07:25", "07:45", "08:05", "08:25", "09:15",
            "09:54", "10:33", "11:12", "11:51", "12:30", "13:09", "13:48",
            "14:27", "15:06", "15:45", "16:05", "16:25", "16:45", "17:05",
            "17:25", "17:45", "18:05", "18:25", "18:45", "19:05", "19:25",
            "20:45", "22:05"];
}

function initRoute(busIn)
{

  var minDelta,
      maxStops;

  switch(busIn)
  {
    case 369.1:
      minDelta = 4;
      maxStops = 2;
      busSched = _3691;
      break;
    case 369:
      minDelta = 11;
      maxStops = 13;
      busSched = _3690;
      break;
    default:
      minDelta = 0;
      maxStops = 0;
      busSched = "";
  }

  var delta = [],
      avgStops = maxStops/2,
      timeConversion = 60 * 1000;

  delta[0] = minDelta * timeConversion,
  delta[1] = (minDelta + (avgStops/2)) * timeConversion,
  delta[2] = (minDelta + (maxStops/2)) * timeConversion;

/*
  for (var i = 0; i < busSched.length; i++)
  {
    var temp = Date.parse(genericDate + busSched[i] + sec) + delta[1];
    busSched[i] = timeToParse(new Date(temp));
  }
*/

  return delta;
}

function timeToParse(toParse)
{
  parsedHour = toParse.getHours(),
  parsedMins = toParse.getMinutes();

  parsedHour = (parsedHour < 10 ? "0" + parsedHour : parsedHour);
  parsedMins = (parsedMins < 10 ? "0" + parsedMins : parsedMins);

  return parsedHour + ":" + parsedMins;
}

function localTime()
{
  return Date.parse(genericDate + timeToParse(new Date()) + sec);
}

function getNextVal(busArray, minDelta)
{
  var curTime =localTime();
  for (var i = 0; i < busArray.length; i++)
    if (Date.parse(genericDate + busArray[i] + sec) + minDelta > curTime)
    {
      posNext = i+1;
      return busArray[i];
    }
  posNext = 0;
  return bussArray[0];
}

function mainFunction(inBus)
{

   var verify = inBus;
  if (verify != 369 &&
      verify != 369.1)
  {
    console.log("Unsupported or invalid bus code " + verify +". Exiting.");
    return;
  }

  globalInit();

  var busInput = parseFloat(verify),
      busDelay = initRoute(busInput),
      nextBus  = getNextVal(busSched, busDelay[0]);

  var iniTime = new Date(Date.parse(genericDate+ nextBus+ sec)+ busDelay[0]),
      midTime = new Date(Date.parse(genericDate+ nextBus+ sec)+ busDelay[1]),
      finTime = new Date(Date.parse(genericDate+ nextBus+ sec)+ busDelay[2]);

  console.log('Próximo ônibus ' +
              busInput + ': ' +
              timeToParse(iniTime) + ' - ' +
              timeToParse(finTime) + '. Previsão: [' +
              timeToParse(midTime) + ']');

  return (timeToParse(midTime));
}

function getTimeSheet(inPar)
{
   var str = "";
   if (inPar == '369')   str = _3690.slice(posNext, posNext+12).join(" ");
   if (inPar == '369.1') str = _3691.slice(posNext, posNext+12).join(" ");
   return str;
}

function exec369x(inPar) { return mainFunction(inPar); }
