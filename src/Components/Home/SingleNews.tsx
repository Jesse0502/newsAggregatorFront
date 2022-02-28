import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { formatDistanceToNow } from 'date-fns'
import { useContext, useState } from "react";
import { postSavedStories } from "../../apis/savedStories/postSavedStories";
import RecentlyViewedStories from "../../Contexts/recentlyViewedStories";
import useAuth from "../../customHooks/useAuth";

function SingleNews(props: any) {
  let newsData: any = props.data
  let recentStoriesCtx: any = useContext(RecentlyViewedStories) 
  let {authInfo} = useAuth()
  const addToViewStory = async (heading: any, link: any, image: any = "", source = "", time = "") => {
    let stringDat: any = localStorage.getItem("viewedStories")
    let viewed: any = JSON.parse(stringDat)
    if (viewed && viewed.length !== 0) {
      if (viewed.length > 2) {
        localStorage.setItem("viewedStories", JSON.stringify(viewed.pop()))
        recentStoriesCtx.setRecentStory(recentStoriesCtx.recentStory.pop())
      }
      localStorage.setItem("viewedStories", JSON.stringify([{ heading: heading, link: link }, ...viewed]))
      recentStoriesCtx.setRecentStory([{heading: heading, link: link}, ...recentStoriesCtx.recentStory])
    } else { 
      localStorage.setItem("viewedStories", JSON.stringify([{ heading: heading, link: link }])) 
      recentStoriesCtx.setRecentStory([{ heading: heading, link: link }])
    }
    if(authInfo && authInfo !== undefined){
      let postToDb = {
        heading,
        link,
        image,
        source,
        time
      }
      await postSavedStories(postToDb, authInfo.id) 
    }
  }
  return (
    <VStack shadow={"lg"} rounded="lg" mb="8" py="2">
      <Box px="5" py="2">
        <HStack justify={'space-between'}>
          <Box >
          {newsData.Image && <Image
            rounded="md"
            h='32'
            display={{base: 'block', md: "none"}}
            w="72"
            objectFit={"fill"}
            src={newsData.Image}
          />}
            <Heading
              onClick={() => addToViewStory(newsData.Heading, newsData.LinkToSource, newsData.Image, newsData.Source, newsData.Time)}
              as={Link}
              target="_blank"
              _focus={{ outline: 0 }}
              href={newsData.LinkToSource ?? newsData.Link}
              fontSize={{lg:"2xl", base: 'xl'}}
              fontWeight={"bold"}
              color="blue.600"
              cursor="pointer">
              {newsData.Heading}
            </Heading>
            <Text color="gray.600" my="3">
              {newsData.Source} &#8226; {newsData.Time ? formatDistanceToNow(new Date(`${newsData.Time}`), { addSuffix: true }) : ""}
            </Text>
          </Box>
          {newsData.Image && <Image
            display={{base: 'none', md: 'block'}}
            rounded="md"
            h="28"
            w="30"
            objectFit={"cover"}
            src={newsData.Image}
          />}
        </HStack>
        {newsData.SimilarNews && <Text pt="4" fontWeight={"semibold"} fontStyle='oblique' fontSize="2xl">
          {newsData.SimilarNews.length ? "Similar Stories" : ""}
        </Text>}
        <Box pt="2">
          {newsData.SimilarNews && newsData.SimilarNews.map((a: any, b: number) => (
            <Box key={b} py="2" gap={1} onClick={() => addToViewStory(a.Heading, a.Link, "", a.Source, a.Time)}>
              <Link
                href={a.Link}
                target="_blank"
                fontWeight={"semibold"}>
                {a.Heading}
              </Link>
              <Text color="gray.600" my="1" fontSize={"xs"}>
                {a.Source} &#8226; {a.Time ? formatDistanceToNow(new Date(`${a.Time}`), { addSuffix: true }) : ""}
              </Text>

            </Box>
          ))}

        </Box>
      </Box>
    </VStack>
  );
}

export default SingleNews;
