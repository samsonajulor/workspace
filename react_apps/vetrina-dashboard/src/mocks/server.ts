import "whatwg-fetch";
import { rest, DefaultBodyType, PathParams } from "msw";
import { setupServer } from "msw/node";
import { PayloadType } from "../components/models/DataStructure";

const server = setupServer(
  rest.get<DefaultBodyType, PathParams<string>, PayloadType[]>('https://newsapi.org/v2/everything', (req, res, ctx) => {
      
    return res(ctx.status(200), ctx.json([
          {
            source: {
              id: null,
              name: "Lifehacker.com",
            },
            author: "Jake Peterson",
            title: "How to Watch Apple's WWDC 2022",
            description:
              "WWDC 2022 is nearly here. While most of Apple’s Worldwide Developer Conference is actually a series of presentations and events for iOS, iPadOS, macOS, and watchOS developers, most of us are focused on Apple’s main keynote. Here, the company shows off new fea…",
            url: "https://lifehacker.com/how-to-watch-apples-wwdc-2022-1849001407",
            urlToImage:
              "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/0e79d6e5a9de1694629e75cc103746dd.png",
            publishedAt: "2022-06-01T16:03:15Z",
            content:
              "WWDC 2022 is nearly here. While most of Apples Worldwide Developer Conference is actually a series of presentations and events for iOS, iPadOS, macOS, and watchOS developers, most of us are focused o… [+3421 chars]",
          },
        ]));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export { server, rest };