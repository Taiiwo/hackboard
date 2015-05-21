<?php
// check get variables
// if id is defined
if (array_key_exists('id', $_GET)){
  // generate key
  $key = getKey();
  // add key-id pair to a database with timestamp
  // send email to event owner with url with get parameter 'key'
}
if (array_key_exists('key', $_GET)){
// if key is defined
  // check for keypair in the database
    // also check for old keys
    // if key matches
      // add the id as the owner of the event
      // show authentication complete screen
}
// Generate a random key from /dev/random
function getKey($bit_length = 128){
    $fp = @fopen('/dev/random','rb');
    if ($fp !== FALSE) {
        $key = substr(base64_encode(@fread($fp,($bit_length + 7) / 8)), 0, (($bit_length + 5) / 6)  - 2);
        @fclose($fp);
        return $key;
    }
    return null;
}
 ?>
