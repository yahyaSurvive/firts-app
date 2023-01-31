import { Box, Button, Center, Flex, Image, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Infi = () => {
  const [dataReq, setDataReq] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [limit, setLLimit] = useState(10);
  const [tempID, setTempID] = useState(0);

  const getData = async () => {
    const req = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=${lastId}&_limit=${limit}`);
    const newRes = await req.json();

    setDataReq([...dataReq, ...newRes]);
    setTempID(newRes[limit - 1].id);
  };

  useEffect(() => {
    getData();
  }, [lastId]);

  const fetchMore = () => {
    setLastId(tempID);
  };

  console.log(dataReq);
  console.log(lastId);
  return (
    <Box w={"800px"} m="auto">
      <Text textAlign={"center"} my="20px" fontSize={"16pt"} fontWeight="bold">
        Infinite Scroll
      </Text>

      <Box my={"20px"}>
        <form>
          <Flex>
            <Input type={"text"} name="cari_item" placeholder="search" />
            <Button type="submit" mx={"10px"} colorScheme="cyan">
              Cari
            </Button>
          </Flex>
        </form>
      </Box>

      <InfiniteScroll dataLength={dataReq.length} next={fetchMore} hasMore={true} loader={<h4>Loading Bos...</h4>}>
        {dataReq.map((item) => (
          <Box key={item.id} bg={"gray.100"} w="full" h={"120px"} mb="20px">
            <Text>{item.id}</Text>
            <Text>{item.title}</Text>
            <Image src={item.url} w="90%" h={"60%"} />
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

export default Infi;
