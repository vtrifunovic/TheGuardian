//import statements
import React, { useEffect } from 'react';
import { ImageBackground, Pressable, Text, View, ActivityIndicator} from 'react-native';
import Styles from './styles';
import {complex, re, sqrt, exp, multiply, subtract} from 'mathjs';

var PI = 3.14159;
var plotvals = 'a';

const DataAnalysis = ({route, navigation}) => {
  if (plotvals == 'a')
  {
    var {zval, tstamp} = route.params;
    plotvals = run_analysis(zval, tstamp);
    zval = [];
    tstamp = [];
  }
  return (
    <View style={Styles.container}>
      <ImageBackground 
      style={Styles.image} 
      source={require('../mainmenu/Logo2.png')}>
        {/*creating pressable to go back to main menu*/}
        <Pressable style={Styles.back}
        onPress={() => navigation.navigate('Main Menu')}>
          <Text style={Styles.buttontext}>
            Back
          </Text>
        </Pressable>
        <Text style = {Styles.buttontext}>
            {plotvals}
        </Text>
      </ImageBackground>
    </View>
  )
}
export default DataAnalysis;

function run_analysis(zvalues, tstamps)
{
    var mean = findmean(tstamps)
    var meddata = medianfilter(zvalues, zvalues.length)
    var detacc = lineardetrend(tstamps, meddata)

    // > 0.1(highband) makes litte difference to BW
    // 0.5 (highband) looks VERY SEXY
    var bwdata = butterworth(detacc.length, mean, 0.5, 5, detacc)

    var velocity = cumtrapz(bwdata, mean);

    var detvel = lineardetrend(tstamps, velocity)

    var medvel = medianfilter(detvel, detvel.length)
    var distance = cumtrapz(medvel, mean);

    var absdist = [];
    for (var z = 0; z < distance.length; z++)
    {
        absdist.push((distance[z]))
    }

    var pks = findpeaks(absdist, tstamps)
    var allpks = [];
    for (var z = 0; z < pks.length; z++)
    {
        allpks.push(abs(pks[z][0]*39.37))
    }

    var mypks = truedist(allpks, tstamps);

    function truedist(array, tstamps)
    {
        var retarray = [];
        for (var h = 0; h < array.length-1; h++)
        {
            retarray[h] = (abs(array[h+1]) + abs(array[h]))/2 + "\n";
        }
        return retarray;
    }

    function abs(val)
    {
        if (val>0)
        {
            return val
        }
        else{
            return -val;
        }
    }

    function average(val)
    {
        var total = 0;
        for (var i = 0; i < val.length; i++)
        {
            total += val[i];
        }
        return total/val.length
    }
    return mypks;
}

function findmean(time_stamps)
{
    var total = 0;
    // WHAT THE FUCK WORK ALREADY!!!!
    for (var x = 1; x < time_stamps.length; x++)
    {
        total += time_stamps[x] - time_stamps[x-1];
    }
    return (total/time_stamps.length)/1000;
}

function medianfilter(dataset, length)
{
    var window = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var dataset2 = [];
    //does this make it 3rd order? ;-;
    for (var order = 0; order < 3; order++)
    {
        for (var row = 0; row < length; row++)
        {
            window[0] = dataset[row-4];
            window[1] = dataset[row-3];
            window[2] = dataset[row-2];
            window[3] = dataset[row-1];
            window[4] = dataset[row];
            window[5] = dataset[row+1];
            window[6] = dataset[row+2];
            window[7] = dataset[row+3];
            window[8] = dataset[row+4];

            var newWindow = insertionSort(window, 9);
            dataset2[row] = newWindow[4];
        }
    }
    return dataset2;
}

function insertionSort(arr, val)
{
    var j; var key;
    for (var k = 1; k < val; k++)
    {
        key = arr[k];
        j = k-1;
        while (j >= 0 && arr[j] > key)
        {
            arr[j+1] = arr[j];
            j = j - 1;
        }
        arr[j+1] = key;
    }
    return arr;
}

function lineardetrend(values_x, values_y)
{
    var trend = findLineByLeastSquares(values_x, values_y);
    var totval = values_y.length;
    for (var j = 0; j < totval; j++)
    {
        values_y[j] = values_y[j]// - (trend[1][j]);
    }
    return values_y;
}

function findLineByLeastSquares(values_x, values_y) {
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_xx = 0;
    var count = 0;
    var x = 0;
    var y = 0;
    var values_length = values_x.length;

    if (values_length != values_y.length) {
        console.log(values_length + " != " + values_y.length)
        throw new Error('The parameters values_x and values_y need to have same size!');
    }

    if (values_length === 0) {
        return [ [], [] ];
    }

    for (var v = 0; v < values_length; v++) {
        x = values_x[v];
        y = values_y[v];
        sum_x += x;
        sum_y += y;
        sum_xx += x*x;
        sum_xy += x*y;
        count++;
    }

    var m = (count*sum_xy - sum_x*sum_y) / (count*sum_xx - sum_x*sum_x);
    var b = (sum_y/count) - (m*sum_x)/count;

    var result_values_x = [];
    var result_values_y = [];

    for (var v = 0; v < values_length; v++) {
        x = values_x[v];
        y = x * m + b;
        result_values_x.push(x);
        result_values_y.push(y);
    }

    return [result_values_x, result_values_y];
}

function butterworth(n, lowband, highband, filterorder, inarray)
{
    // amount of values being sent to filter
    var N = n;
    // passing values between 0 - 1 for our lowband and highband
    // this is a bandpass filter, but were stretching it to fit 
    var frequencybands = [lowband, highband];
    // order of the filter::values 1 - 9
    var FiltOrd = filterorder;

    var a = [];
    var b = [];
    var x = inarray;
    var y = [];

    a = ComputeDenCoeffs(FiltOrd, frequencybands[0], frequencybands[1]);
    b = ComputeNumCoeffs(FiltOrd, frequencybands[0], frequencybands[1], a);
    y = filter(x, b, a);

    return y;
}

function ComputeDenCoeffs(FiltOrd, Lcutoff, Ucutoff)
{
    var k;
    var theta = PI * (Ucutoff - Lcutoff)/2;
    var cp = Math.cos(PI *  (Ucutoff + Lcutoff)/2);
    var st = Math.sin(theta);
    var ct = Math.cos(theta);
    var s2t = 2.0*st*ct;
    var c2t = 2.0*ct*ct-1;
    var RCoeffs = [];
    var TCoeffs = [];
    var PoleAngle;
    var SinPoleAngle;
    var CosPoleAngle;
    var a;

    for (var k = 0; k < FiltOrd; k++)
    {
        PoleAngle = PI * (2*k+1)/(2*FiltOrd);
        SinPoleAngle = Math.sin(PoleAngle);
        CosPoleAngle = Math.cos(PoleAngle);
        a = 1.0+s2t*SinPoleAngle;
        RCoeffs[2*k] = c2t/a;
        RCoeffs[2*k+1] = s2t*CosPoleAngle/a;
        TCoeffs[2*k] = -2*cp*(ct+st*SinPoleAngle)/a;
        TCoeffs[2*k+1] = -2*cp*st*CosPoleAngle/a;
    }
    var DenomCoeffs = TrinomialMultiply(FiltOrd, TCoeffs, RCoeffs)
    DenomCoeffs[1] = DenomCoeffs[0];
    DenomCoeffs[0] = 1;
    for (var k = 3; k <= 2*FiltOrd; k++)
    {
        DenomCoeffs[k] = DenomCoeffs[2*k-2];
    }

    for (var i = DenomCoeffs.length -1; i > FiltOrd*2+1; i--)
    {
        DenomCoeffs.pop
    }
    return DenomCoeffs
}


//return to this function, might be errors returning NaN
function TrinomialMultiply(FiltOrd, b, c)
{
    // CONSOLE.LOG STARTED SHOWING VALUES AFTER 0'S WERE PUT IN
    // USE THIS KNOWLEDGE TO RE-CODE THE REST TO GET WORKING VALUES
    // <3
    var RetVal = Array(FiltOrd*4).fill(0);
    //var RetVal = [0];
	RetVal[2] = c[0];
	RetVal[3] = c[1];
	RetVal[0] = b[0];
	RetVal[1] = b[1];

    for (var i = 1; i < FiltOrd; i++)
    {
        RetVal[2 * (2 * i + 1)] += c[2 * i] * RetVal[2 * (2 * i - 1)] - c[2 * i + 1] * RetVal[2 * (2 * i - 1) + 1];
        RetVal[2 * (2 * i + 1) + 1] += c[2 * i] * RetVal[2 * (2 * i - 1) + 1] + c[2 * i + 1] * RetVal[2 * (2 * i - 1)];

        for (var j = 2 * i; j > 1; j--)
        {
            RetVal[2 * j] += b[2 * i] * RetVal[2 * (j - 1)] - b[2 * i + 1] * RetVal[2 * (j - 1) + 1] + c[2 * i] * RetVal[2 * (j - 2)] - c[2 * i + 1] * RetVal[2 * (j - 2) + 1];
            RetVal[2 * j + 1] += b[2 * i] * RetVal[2 * (j - 1) + 1] + b[2 * i + 1] * RetVal[2 * (j - 1)] + c[2 * i] * RetVal[2 * (j - 2) + 1] + c[2 * i + 1] * RetVal[2 * (j - 2)];
        }
        RetVal[2] += b[2 * i] * RetVal[0] - b[2 * i + 1] * RetVal[1] + c[2 * i];
		RetVal[3] += b[2 * i] * RetVal[1] + b[2 * i + 1] * RetVal[0] + c[2 * i + 1];
		RetVal[0] += b[2 * i];
		RetVal[1] += b[2 * i + 1];
    }
    //console.log(RetVal)
    //console.log(RetVal.length)
    return RetVal;
}

function ComputeNumCoeffs(FiltOrd, Lcutoff, Ucutoff, DenC)
{
    var TCoeffs = [];
    var NumCoeffs = [];
    var NormalizedKernel = [0,0,0,0,0,0,0,0,0];

    var Numbers = [];
    for (var n = 0; n < FiltOrd*2 + 1; n++)
    {
        Numbers[n] = n;
    }
    TCoeffs = ComputeHP(FiltOrd);
    
    for (i = 0; i < FiltOrd; i++)
    {
        NumCoeffs[2*i] = TCoeffs[i];
        NumCoeffs[2*i+1] = 0.0;
    }
    NumCoeffs[2*FiltOrd] = TCoeffs[FiltOrd];
    var cp = [];
    cp[0] = 2 * 2 * Math.tan(PI * Lcutoff/2);
    cp[1] = 2 * 2 * Math.tan(PI * Ucutoff/2);
    
    var Bw = cp[1] - cp[0];
    var Wn = Math.sqrt(cp[0]*cp[1]);

    Wn = 2 * Math.atan2(Wn, 4);
    const result = complex(-1, 0);

    for (var k = 0; k < FiltOrd * 2 + 1; k++)
    {
        NormalizedKernel[k] = exp(multiply(subtract(0,sqrt(result)), Wn, Numbers[k]));
    }
    var b = 0;
    var den = 0;
    for (var d = 0; d < FiltOrd * 2 + 1; d++)
    {
        b += re(multiply(NormalizedKernel[d], NumCoeffs[d]));
        den += re(multiply(NormalizedKernel[d], DenC[d]));
    }
    
    for (var c = 0; c < FiltOrd * 2 + 1; c++)
    {
        NumCoeffs[c] = (NumCoeffs[c]*den)/b;
    }

    for (var i = NumCoeffs.length - 1; i > FiltOrd * 2 + 1; i--)
    {
        NumCoeffs.pop
    }
    return NumCoeffs;
}

function ComputeHP(FiltOrd)
{
    var NumCoeffs = [];

    NumCoeffs = ComputeLP(FiltOrd);

    for (var i = 0; i <= FiltOrd; i++)
    {
        if (i%2)
        {
            NumCoeffs[i] = -NumCoeffs[i];
        }
    }
    return NumCoeffs;
}

function ComputeLP(FiltOrd)
{
    var NumCoeffs = [];
    NumCoeffs[0] = 1;
    NumCoeffs[1] = FiltOrd;
    var m = FiltOrd/2;
    for (var i = 2; i <= m; i++)
    {
        NumCoeffs[i] = (FiltOrd - i + 1)*NumCoeffs[i - 1] / i;
        NumCoeffs[FiltOrd-i] = NumCoeffs[i];
    }
    NumCoeffs[FiltOrd-1] = FiltOrd;
    NumCoeffs[FiltOrd] = 1;
    return NumCoeffs;
}

function filter(x, coeff_b, coeff_a)
{
    var len_x = x.length;
    var len_b = coeff_b.length;
    var len_a = coeff_a.length;

    var zi = Array(len_b).fill(0);
    var filter_x = Array(len_x).fill(0);
    if (len_a == 1)
    {
        for (var m = 0; m < len_x; m++)
        {
            filter_x[m] = coeff_b[0] * x[m] + zi[0];
            for (var i = 1; i < len_b; i ++)
            {
                zi[i - 1] = coeff_b[i] * x[m] + zi[i];
            }
        }
    }
    else
    {
        for (var m = 0; m < len_x; m++)
        {
            filter_x[m] = coeff_b[0] * x[m] + zi[0];
            for (var i = 1; i <len_b; i++)
            {
                zi[i - 1] = coeff_b[i] * x[m] + zi[i] - coeff_a[i] * filter_x[m];
            }
        }
    }
    return filter_x;
}

function cumtrapz(data, tstamps)
{
    var cumsum = [0];
    var interval = tstamps;
    var tot = data.length;
    for (var x = 0; x < tot-1; x++)
    {
        cumsum[x+1] = (((data[x]+data[x+1])/2)*interval) + cumsum[x];
    }
    return cumsum;
}

function findpeaks(samples, time_stamps)
{
    var sLength = samples.length;
    var peak = [];
    if (sLength != time_stamps.length) {
        throw new Error('The parameters samples and time_stamps need to have same size!');
    }
    for (var g = 1; g < sLength; g++)
    {
        if (samples[g] > 0 && samples[g] > samples[g-1] && samples[g] > samples[g+1])
        {
            peak.push([samples[g], time_stamps[g]]);
        }
        if (samples[g] < 0 && samples[g] < samples[g-1] && samples[g] < samples[g+1])
        {
            peak.push([samples[g], time_stamps[g]]);
        }
    } 
    return peak
}