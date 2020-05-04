<?php
include '../config.php';
$data=$_POST['data'];
$arr;
$reg='/<img[^>]*?class="cache"[^>]*?>/';

function getFileNames($str){
	if(!empty($str)){
		$preg='/src="[^"]*?"/';
		preg_match_all($preg,$str,$ar);
		$preg2='/"[^"]*?"/';
		$files = array();
		foreach ($ar[0] as $key => $value) {
			preg_match($preg2,$value,$ar[0][$key]);
			$a=$ar[0][$key][0];
			$b=str_replace('"','',$a);
			$files[$key]=basename($b);
		}
		return $files;
	}
}

function reCacheImages(){
	$imgs=implode(',', $GLOBALS['arr'][0]);
	$fileName = getFileNames($imgs);
	//var_dump($fileName);die;
	$filepaths = array();
	foreach ($fileName as $key => $value) {
		$filepaths[$key]=$_SERVER['DOCUMENT_ROOT'].'/'.__UPDIR__.'/'.$fileName[$key];
	}

	//var_dump($filepaths);
	$finalPath =array();
	foreach ($filepaths as $key => $value) {
		//$result[$key] = file_exists($filepaths[$key]);
		$finalPath[$key] = $_SERVER['DOCUMENT_ROOT'].'/'.__UPDIR_FINAL__.'/'.$fileName[$key];
		if(false==copy($filepaths[$key],$finalPath[$key])){

			$finalPath[$key]='';
			continue;
		}else{
			$finalPath[$key]='http://'.$_SERVER['HTTP_HOST'].'/'.__UPDIR_FINAL__.'/'.$fileName[$key];
		}

	}

	//echo json_encode($finalPath,JSON_UNESCAPED_SLASHES);
	foreach ($finalPath as $key => $value) {
		$GLOBALS['arr'][0][$key] = preg_replace('/src=".*?"/','src="'.$finalPath[$key].'"',$GLOBALS['arr'][0][$key]);
		$GLOBALS['arr'][0][$key] = preg_replace('/class=".*?"/','',$GLOBALS['arr'][0][$key]);
	}
	$GLOBALS['data']=preg_replace(array_fill(0,sizeof($GLOBALS['arr'][0]),$GLOBALS['reg']),$GLOBALS['arr'][0],$_POST['data'],1);


	
}

function forCacheTxt(){
	$myfile = fopen($_SERVER['DOCUMENT_ROOT'].'/'.__UPDIR__.'/'."cache.txt", "w") or die("Unable to open file!");  //w  重写  a追加 
	fwrite($myfile,$GLOBALS['data']); 
	fclose($myfile); 
}

//如果有图片，则搞定图片问题
//var_dump(array_fill(0,3,$GLOBALS['reg']));die;
if(0!=preg_match_all($GLOBALS['reg'],$_POST['data'],$arr)){
	//存在缓存图片
	$GLOBALS['arr'] = $arr;

	reCacheImages();
	
}


//预存在一个txt里面
forCacheTxt();
echo $GLOBALS['data'];
?>