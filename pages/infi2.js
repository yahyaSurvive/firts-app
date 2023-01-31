import { Box, Button, Center, Flex, Image, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import * as XLSX from "xlsx/xlsx.mjs";

const Infi2 = () => {
  const [dataReq, setDataReq] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [limit, setLLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [tempID, setTempID] = useState(0);
  const [judul, setJudul] = useState([
    { label: "ID USER", key: "id" },
    { label: "NAMA", key: "name" },
    { label: "EMAIL", key: "email" },
    { label: "JENIS KELAMIN", key: "gender" },
    { label: "TGL BUAT", key: "createdAt" },
    { label: "TGL UPDATE", key: "updatedAt" },
  ]);

  const [loadAja, setTLoadAja] = useState(true);

  useEffect(() => {
    getDataUser();
    console.log("masuk");
  }, [lastId, keyword]);

  const getDataUser = async () => {
    const req = await fetch(`http://localhost:4000/users?limit=${limit}&search_query=${keyword}&lastId=${lastId}`);
    const newRes = await req.json();

    // console.log(newRes.data[limit - 1].id);
    setDataReq([...dataReq, ...newRes.data]);
    setTempID(newRes.data.length ? newRes.data[newRes.data.length - 1].id : 0);
    // console.log("wow : ", newRes.data.length);

    setTLoadAja(newRes.data.length >= limit ? true : false);
  };

  const fetchMore = () => {
    setLastId(tempID);
  };

  const searchData = (e) => {
    e.preventDefault();

    if (query === "") {
      console.log("kosong");
      window.alert("data harus terisis!");
    } else if (query === keyword) {
    } else {
      setLastId(0);
      setDataReq([]);
      setKeyword(query);
    }
  };

  const DW = () => {
    const heading = [["ID USER", "NAMA", "EMAIL", "GENDER", "TGL DIBUAT", "TGL DIUPDATE"]];
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(dataReq);
    XLSX.utils.sheet_add_aoa(ws, heading);
    XLSX.utils.sheet_add_json(ws, dataReq, { origin: "A2", skipHeader: true });

    XLSX.utils.book_append_sheet(wb, ws, "contoh");
    XLSX.writeFile(wb, "contoh saya.xlsx");
  };

  // console.log(dataReq);
  // console.log(lastId);

  console.log("setelah submit last id :", lastId);
  console.log("setelah submit keyword :", keyword);
  console.log("setelah submit limit :", limit);
  console.log("setelah data req : ", dataReq);
  return (
    <Box w={"800px"} m="auto">
      <Text textAlign={"center"} my="20px" fontSize={"16pt"} fontWeight="bold">
        Infinite Scroll 2
      </Text>

      <Box my={"20px"}>
        <form onSubmit={searchData}>
          <Flex>
            <Input value={query} onChange={(e) => setQuery(e.target.value)} type={"text"} name="cari_item" placeholder="search" />
            <Button type="submit" mx={"10px"} colorScheme="cyan">
              Cari
            </Button>
          </Flex>
        </form>
      </Box>

      <Box my={"20px"}>
        <Button onClick={DW}>Download Aja</Button>
      </Box>

      <Button
        onClick={() => {
          console.log();
          console.log(judul);
        }}
      >
        Lihat
      </Button>

      <InfiniteScroll dataLength={dataReq.length} next={fetchMore} hasMore={loadAja} loader={<h4>Loading Bos...</h4>}>
        {dataReq.map((item) => (
          <Box key={item.id} bg={"gray.100"} w="full" h={"120px"} mb="20px">
            <Text fontWeight={"bold"}>{item.id}</Text>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
          </Box>
        ))}
      </InfiniteScroll>

      <Center>
        <Button variant={"solid"} colorScheme="whatsapp">
          Load More
        </Button>
      </Center>
    </Box>
  );
};

export default Infi2;
