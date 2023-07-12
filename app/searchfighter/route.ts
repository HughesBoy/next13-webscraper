import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import * as cheerio from 'cheerio';

export async function POST(request: Request){ //get the inputText variable from searchperson page.tsx using request parameter above
  const { inputText : userInput } = await request.json()  //rename inputText to userSearch for seperating client and server names (good practice)

  if(!userInput){
    return NextResponse.json("please provide a input")
  }

  let browser;

  try {

    browser = await puppeteer.launch({ headless: "new" })
    const page = await browser.newPage();
    await page.goto("https://www.tapology.com/search")
    await page.type("#siteSearch", userInput)
    await page.keyboard.press("Enter")
    await page.waitForNavigation(); //waits for the promise to resolve

    const html = await page.content();
    //console.log(html) used to see html returned from page in server/terminal

    const $ = cheerio.load(html);

    const fighters = $("#content > div.searchResultsFighter > table > tbody > tr:nth-child(2) > td:nth-child(1) > a").map((idx, elem) => {
      return $(elem).text();
    }).get();

    // const weight = $("table.fcLeaderboard").map((idx, elem) => {
    //   return $(elem).text();
    // }).get();

    const fighterList = [];

		for (let i = 0; i < fighters.length; i++) {
			const item = {
				fighter: fighters[i],
				
				
			};
			fighterList.push(item);
		}

    return NextResponse.json(fighterList);

  } catch (error: any) {
      return NextResponse.json(error);
  } finally {
      if(browser){
        await browser.close();
      }
  }

}