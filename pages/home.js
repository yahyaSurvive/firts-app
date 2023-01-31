import { Box, Button, Center, Flex, Image, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

const home = ({ res, resAllData }) => {
  const [inc, setInc] = useState(10);
  const [dataFoto, setDataFoto] = useState(res);
  const [dataFotoAll, setDataFotoAll] = useState(resAllData);
  const [liveCari, setLiveCari] = useState("");
  const [tanda, setTanda] = useState(false);

  const router = useRouter();

  //fungtioh untuk load lagi
  const loadMore = async () => {
    // console.log("sampek");
    const req = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=${inc}&_limit=10`);
    const newRes = await req.json();
    setDataFoto([...dataFoto, ...newRes]);
    setInc(inc + 10);
    console.log(dataFoto);
  };

  // const handleOnchange = (e) => {
  //   setLiveCari(e.target.value);
  // };

  const cari = async (e) => {
    e.preventDefault();
    setDataFoto(dataFotoAll);

    const nilaiInput = new FormData(e.target);

    const cariItem = nilaiInput.get("cari_item");

    setLiveCari(cariItem);
  };

  return (
    <Box w={"800px"} m="auto">
      <Text textAlign={"center"} my="20px" fontSize={"16pt"} fontWeight="bold">
        Home
      </Text>

      <Box my={"20px"}>
        <form onSubmit={cari}>
          <Flex>
            <Input name="cari_item" placeholder="search" />
            <Button type="submit" mx={"10px"} colorScheme="cyan">
              Cari
            </Button>
          </Flex>
        </form>
      </Box>

      {dataFoto
        .filter((item) => {
          return liveCari.toLowerCase() === "" ? item : item.title.toLowerCase().includes(liveCari);
        })
        .map((item) => (
          <Box key={item.id} bg={"gray.100"} w="full" h={"120px"} mb="20px">
            <Text>{item.title}</Text>
            <Text>{item.id}</Text>
            <Image src={item.url} w="90%" h={"60%"} />;
          </Box>
        ))}
      {/* {dataFoto.map((item) => (
        <Box key={item.id} bg={"gray.100"} w="full" h={"120px"} mb="20px">
          <Text>{item.title}</Text>
          <Text>{item.id}</Text>
          <Image src={item.url} w="90%" h={"60%"} />;
        </Box>
      ))} */}
      <Center>
        <Button onClick={loadMore} variant={"solid"} colorScheme="whatsapp">
          Load More
        </Button>
      </Center>
    </Box>
  );
};

export default home;

export async function getServerSideProps() {
  const req = await fetch("https://jsonplaceholder.typicode.com/photos?_start=0&_limit=10");
  const res = await req.json();

  const allData = await fetch("https://jsonplaceholder.typicode.com/photos");
  const resAllData = await allData.json();

  return {
    props: {
      res,
      resAllData,
    },
  };
}
