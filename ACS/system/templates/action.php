$userid = "";

       if (isset($_REQUEST['userid']) && $_REQUEST['userid'] != "") {
           $userid = trim($_REQUEST['userid'],"[]");
       }
       $sql = "delete from yufuyuan.myuser where id IN ({$userid})";
//        echo $sql;
       $res = $pdo->exec($sql);
       if ($res) {
           echo 1;
       } else {
           echo 0;
       }