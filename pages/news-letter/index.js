import {StyledReadingSection} from "../../components/subComponents/ReadingTextBlock";
import { useRouter } from 'next/router'
import React from "react";
import styled from "styled-components";

const GreyBox = styled.section`
  background-color: ${({theme}) => theme.colors.primaryGrey};
  display: grid;
  padding: 6rem;
  justify-content: center;
`

const NewsLetterForm = () => {
    const router = useRouter();
    const routeQuery = router.query;

    const registerSubscription = async event => {
        event.preventDefault(); // don't redirect the page
        // where we'll add our form logic

        const res = await fetch("/api/submitSubscription", {
            body: JSON.stringify({
                person_first_name: event.target.person_first_name.value,
                person_last_name: event.target.person_last_name.value,
                email_addr: event.target.email_addr.value,
                zip: event.target.zip.value
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })

        const result = await res.json()

        console.log(result);

        return result;

    }


    return (
        <>
            <StyledReadingSection>
                <GreyBox>
        <form onSubmit={registerSubscription}>
            <div>
                <label htmlFor="person_first_name">First Name</label><br/>
                <input id="person_first_name" type="text" autoComplete="person_first_name" required />
            </div>
            <div>
                <label htmlFor="person_last_name">Last Name</label><br/>
                <input id="person_last_name" type="text" autoComplete="person_last_name" required />
            </div>
            <div>
                <label htmlFor="email_addr">Email</label><br/>
                <input id="email_addr" type="text" autoComplete="email_addr" value={`${routeQuery.email_addr ? routeQuery.email_addr : ""}`} required />
            </div>
            <div>
                <label htmlFor="zip">Zip Code</label><br/>
                <input id="zip" type="text" autoComplete="zip" required />
            </div>
            <button type="submit">Submit</button>
        </form>
                </GreyBox>
            </StyledReadingSection>
        </>
    )
};

export async function getServerSideProps(context) {

    // res.status(200).json({success: "forced"})
    // if (context.req.method === "POST") {
    //     context.response.statusCode(200);
    // }
    return { props: {  } };
}

export default NewsLetterForm;



// {
//       req: IncomingMessage {
//         _readableState: ReadableState {
//               objectMode: false,
//               highWaterMark: 16384,
//               buffer: BufferList { head: null, tail: null, length: 0 },
//               length: 0,
//               pipes: [],
//               flowing: null,
//               ended: true,
//               endEmitted: false,
//               reading: false,
//               constructed: true,
//               sync: true,
//               needReadable: false,
//               emittedReadable: false,
//               readableListening: false,
//               resumeScheduled: false,
//               errorEmitted: false,
//               emitClose: true,
//               autoDestroy: true,
//               destroyed: false,
//               errored: null,
//               closed: false,
//               closeEmitted: false,
//               defaultEncoding: 'utf8',
//               awaitDrainWriters: null,
//               multiAwaitDrain: false,
//               readingMore: true,
//               dataEmitted: false,
//               decoder: null,
//               encoding: null,
//               [Symbol(kPaused)]: null
//             },
//         _events: [Object: null prototype] { end: [Function: clearRequestTimeout] },
//         _eventsCount: 1,
//         _maxListeners: undefined,
//         socket: Socket {
//               connecting: false,
//               _hadError: false,
//               _parent: null,
//               _host: null,
//               _readableState: [ReadableState],
//               _events: [Object: null prototype],
//               _eventsCount: 8,
//               _maxListeners: undefined,
//               _writableState: [WritableState],
//               allowHalfOpen: true,
//               _sockname: null,
//               _pendingData: null,
//               _pendingEncoding: '',
//               server: [Server],
//               _server: [Server],
//               parser: [HTTPParser],
//               on: [Function: socketListenerWrap],
//               addListener: [Function: socketListenerWrap],
//               prependListener: [Function: socketListenerWrap],
//               setEncoding: [Function: socketSetEncoding],
//               _paused: false,
//               _httpMessage: [ServerResponse],
//               [Symbol(async_id_symbol)]: 10469,
//               [Symbol(kHandle)]: [TCP],
//               [Symbol(kSetNoDelay)]: false,
//               [Symbol(lastWriteQueueSize)]: 0,
//               [Symbol(timeout)]: null,
//               [Symbol(kBuffer)]: null,
//               [Symbol(kBufferCb)]: null,
//               [Symbol(kBufferGen)]: null,
//               [Symbol(kCapture)]: false,
//               [Symbol(kBytesRead)]: 0,
//               [Symbol(kBytesWritten)]: 0,
//               [Symbol(RequestTimeout)]: undefined
//             },
//         httpVersionMajor: 1,
//         httpVersionMinor: 1,
//         httpVersion: '1.1',
//         complete: true,
//         rawHeaders: [
//               'Host',
//               'localhost:3000',
//               'User-Agent',
//               'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:96.0) Gecko/20100101 Firefox/96.0',
//               'Accept',
//               'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
//               'Accept-Language',
//               'en-US,en;q=0.5',
//               'Accept-Encoding',
//               'gzip, deflate',
//               'Connection',
//               'keep-alive',
//               'Cookie',
//               'Idea-ed1e0155=f313dced-a0e9-4d88-a34f-65452ab1e61d',
//               'Upgrade-Insecure-Requests',
//               '1',
//               'Sec-Fetch-Dest',
//               'document',
//               'Sec-Fetch-Mode',
//               'navigate',
//               'Sec-Fetch-Site',
//               'none',
//               'Sec-Fetch-User',
//               '?1'
//             ],
//         rawTrailers: [],
//         aborted: false,
//         upgrade: false,
//         url: '/news-letter',
//         method: 'GET',
//         statusCode: null,
//         statusMessage: null,
//         client: Socket {
//               connecting: false,
//               _hadError: false,
//               _parent: null,
//               _host: null,
//               _readableState: [ReadableState],
//               _events: [Object: null prototype],
//               _eventsCount: 8,
//               _maxListeners: undefined,
//               _writableState: [WritableState],
//               allowHalfOpen: true,
//               _sockname: null,
//               _pendingData: null,
//               _pendingEncoding: '',
//               server: [Server],
//               _server: [Server],
//               parser: [HTTPParser],
//               on: [Function: socketListenerWrap],
//               addListener: [Function: socketListenerWrap],
//               prependListener: [Function: socketListenerWrap],
//               setEncoding: [Function: socketSetEncoding],
//               _paused: false,
//               _httpMessage: [ServerResponse],
//               [Symbol(async_id_symbol)]: 10469,
//               [Symbol(kHandle)]: [TCP],
//               [Symbol(kSetNoDelay)]: false,
//               [Symbol(lastWriteQueueSize)]: 0,
//               [Symbol(timeout)]: null,
//               [Symbol(kBuffer)]: null,
//               [Symbol(kBufferCb)]: null,
//               [Symbol(kBufferGen)]: null,
//               [Symbol(kCapture)]: false,
//               [Symbol(kBytesRead)]: 0,
//               [Symbol(kBytesWritten)]: 0,
//               [Symbol(RequestTimeout)]: undefined
//             },
//         _consuming: false,
//         _dumped: false,
//         cookies: { 'Idea-ed1e0155': 'f313dced-a0e9-4d88-a34f-65452ab1e61d' },
//         [Symbol(kCapture)]: false,
//         [Symbol(kHeaders)]: {
//               host: 'localhost:3000',
//               'user-agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:96.0) Gecko/20100101 Firefox/96.0',
//               accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
//               'accept-language': 'en-US,en;q=0.5',
//               'accept-encoding': 'gzip, deflate',
//               connection: 'keep-alive',
//               cookie: 'Idea-ed1e0155=f313dced-a0e9-4d88-a34f-65452ab1e61d',
//               'upgrade-insecure-requests': '1',
//               'sec-fetch-dest': 'document',
//               'sec-fetch-mode': 'navigate',
//               'sec-fetch-site': 'none',
//               'sec-fetch-user': '?1'
//             },
//         [Symbol(kHeadersCount)]: 24,
//         [Symbol(kTrailers)]: null,
//         [Symbol(kTrailersCount)]: 0,
//         [Symbol(RequestTimeout)]: undefined,
//         [Symbol(NextRequestMeta)]: {
//               __NEXT_INIT_URL: 'http://localhost:3000/news-letter',
//               __NEXT_INIT_QUERY: {},
//               __nextHadTrailingSlash: undefined
//             }
//       },
//   res: <ref *1> ServerResponse {
//         _events: [Object: null prototype] { finish: [Function: bound resOnFinish] },
//         _eventsCount: 1,
//         _maxListeners: undefined,
//         outputData: [],
//         outputSize: 0,
//         writable: true,
//         destroyed: false,
//         _last: false,
//         chunkedEncoding: false,
//         shouldKeepAlive: true,
//         maxRequestsOnConnectionReached: false,
//         _defaultKeepAlive: true,
//         useChunkedEncodingByDefault: true,
//         sendDate: true,
//         _removedConnection: false,
//         _removedContLen: false,
//         _removedTE: false,
//         _contentLength: null,
//         _hasBody: true,
//         _trailer: '',
//         finished: false,
//         _headerSent: false,
//         _closed: false,
//         socket: Socket {
//               connecting: false,
//               _hadError: false,
//               _parent: null,
//               _host: null,
//               _readableState: [ReadableState],
//               _events: [Object: null prototype],
//               _eventsCount: 8,
//               _maxListeners: undefined,
//               _writableState: [WritableState],
//               allowHalfOpen: true,
//               _sockname: null,
//               _pendingData: null,
//               _pendingEncoding: '',
//               server: [Server],
//               _server: [Server],
//               parser: [HTTPParser],
//               on: [Function: socketListenerWrap],
//               addListener: [Function: socketListenerWrap],
//               prependListener: [Function: socketListenerWrap],
//               setEncoding: [Function: socketSetEncoding],
//               _paused: false,
//               _httpMessage: [Circular *1],
//               [Symbol(async_id_symbol)]: 10469,
//               [Symbol(kHandle)]: [TCP],
//               [Symbol(kSetNoDelay)]: false,
//               [Symbol(lastWriteQueueSize)]: 0,
//               [Symbol(timeout)]: null,
//               [Symbol(kBuffer)]: null,
//               [Symbol(kBufferCb)]: null,
//               [Symbol(kBufferGen)]: null,
//               [Symbol(kCapture)]: false,
//               [Symbol(kBytesRead)]: 0,
//               [Symbol(kBytesWritten)]: 0,
//               [Symbol(RequestTimeout)]: undefined
//             },
//         _header: null,
//         _keepAliveTimeout: 5000,
//         _onPendingData: [Function: bound updateOutgoingData],
//         req: IncomingMessage {
//               _readableState: [ReadableState],
//               _events: [Object: null prototype],
//               _eventsCount: 1,
//               _maxListeners: undefined,
//               socket: [Socket],
//               httpVersionMajor: 1,
//               httpVersionMinor: 1,
//               httpVersion: '1.1',
//               complete: true,
//               rawHeaders: [Array],
//               rawTrailers: [],
//               aborted: false,
//               upgrade: false,
//               url: '/news-letter',
//               method: 'GET',
//               statusCode: null,
//               statusMessage: null,
//               client: [Socket],
//               _consuming: false,
//               _dumped: false,
//               cookies: [Object],
//               [Symbol(kCapture)]: false,
//               [Symbol(kHeaders)]: [Object],
//               [Symbol(kHeadersCount)]: 24,
//               [Symbol(kTrailers)]: null,
//               [Symbol(kTrailersCount)]: 0,
//               [Symbol(RequestTimeout)]: undefined,
//               [Symbol(NextRequestMeta)]: [Object]
//             },
//         _sent100: false,
//         _expect_continue: false,
//         statusCode: 200,
//         flush: [Function: flush],
//         write: [Function: write],
//         end: [Function: end],
//         on: [Function: on],
//         writeHead: [Function: writeHead],
//         [Symbol(kCapture)]: false,
//         [Symbol(kNeedDrain)]: false,
//         [Symbol(corked)]: 0,
//         [Symbol(kOutHeaders)]: null
//       },
//   query: {},
//   resolvedUrl: '/news-letter',
//   locales: undefined,
//   locale: undefined,
//   defaultLocale: undefined
// }