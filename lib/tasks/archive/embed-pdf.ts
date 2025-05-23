import { openai } from "@ai-sdk/openai";
import { streamText, generateText, embedMany } from "ai";
import fs from "fs";
import path from "path";

const pdfUrls = [
  "https://semspub.epa.gov/work/09/100002407.pdf",
  "https://semspub.epa.gov/work/09/100002408.pdf",
  "https://semspub.epa.gov/work/09/100002409.pdf",
  "https://semspub.epa.gov/work/09/100002412.pdf",
  "https://semspub.epa.gov/work/09/100002427.pdf",
];

async function provideEmbeddings() {
  // const embeddings = await Promise.all(
  //   pdfUrls.map(async (url) => {
  //     const response = await fetch(url);
  //     const blob = await response.blob();
  //     const arrayBuffer = await blob.arrayBuffer();
  //     const buffer = Buffer.from(arrayBuffer);
  //     const { embedding } = await embed({
  //       model: openai.embedding('text-embedding-3-small'),
  //       value: buffer.toString('utf-8'),
  //     });
  //     return embedding.data[0].embedding;
  //   })
  // );
  const { embeddings } = await embedMany({
    model: openai.embedding("text-embedding-3-small"),
    values: [
      `The former Siemens facility is located directly adjacent to and north of the former Intersil facility. A residential neighborhood is located immediately north of the Site. Calabazas Creek is approximately 1,100 feet east of the Site and flows north-northeast approximately 7 miles into San Francisco Bay. From 1967 to 1988, Intersil operated its facility at 10900 North Tantau Avenue as a silicon wafer fabrication plant and office building. In connection with these activities, Intersil used inorganic etching solutions (such as acids) and large amounts of water (up to 100,000 gallons per day). Trichloroethylene (TCE), an industrial solvent, was used as a cleaning agent prior to 1979 and 1,1,1-trichloroethane (1,1,1- TCA) was used until closure of the facility in 1988. Intersil initiated investigations of the property in 1983. The investigations conducted between 1983 and 1988 revealed the presence of TCE in soil and groundwater beneath the central and northern portions of the property. From approximately 1970 to 1982, Litronix used the former facility at 10950 North Tantau Avenue for semiconductor manufacturing operations. From 1982 to 1995, Siemens used the facility for semiconductor manufacturing operations. Until the mid-1980s, the semiconductor manufacturing operations involved the use of various organic solvents, primarily TCE and 1,1,1-TCA. Investigations began in 1982 after the discovery of contaminants during the removal of the underground storage tanks. Investigations performed between 1982 and 1989 indicated that releases of mostly chlorinated volatile organic compounds (VOCs) and semi-volatile organic compounds had occurred; these releases affected soil and groundwater at levels that required remediation. Intersil and Siemens initiated the investigation of the Off-Property Study Area in 1986. The Off-Property Study Area has no known history of manufacturing activities and is almost entirely developed for residential use. During the initial investigation, the A Zone groundwater was not found to be impacted and no remediation of the A Zone was required under California Regional Water Quality Control Board, San Francisco Bay Region, Order 90-119. However, the Record of Decision signed shortly thereafter required further Off-Property investigation. This investigation indicated that the B Zone was the most contaminated and that the C Zone was much less contaminated. No direct groundwater extraction from the C Zone was required because the low VOC concentrations in the C Zone were captured by increased pumping in the B Zone. General Electric (GE) has continuously operated a groundwater extraction and treatment (GWET) system at the former Intersil property since 1987. During the most recent five years, GE’s GWET system removed 43.75 pounds of VOCs. GE operated a soil vapor extraction and treatment (SVET) system from 1988 to 1993 and removed 3,000 pounds of VOCs. SMI Holding, LLC (Siemens) has continuously  iv Intersil Inc./Siemens Components Superfund Site Fifth Five-Year Review operated a GWET system at the former Siemens property since 1987. During the most recent five years, Siemens’s GWET system removed 268 pounds of VOCs. Siemens operated a SVET system from 1983 to 2004 and removed 17,310 pounds of VOCs. GE and Siemens have continuously operated a GWET system in the Off-Property Study Area since 1990. During the most recent FYR period, GE and Siemens’s Off-Property GWET system removed 111 pounds of VOCs. The entire Site remedy, including the past soil excavation, past soil vapor extraction, and ongoing groundwater extraction and treatment is functioning as designed. However, TCE concentrations in groundwater sampled from wells in the A and B Zones are above the TCE cleanup standard and the TCE concentrations appear to be stabilizing above the cleanup standards at several locations. Trend analysis was conducted on 12 wells, and results from three of the wells show an increasing trend in TCE concentrations. Toxicity value revisions have occurred for several Contaminants of Concern (COCs), but these changes do not affect protectiveness. Land use and exposure pathways have not changed since the last FYR, and deed restrictive covenants are in place for the former Intersil and former Siemens properties. Although vapor intrusion was previously noted as a potential change in the exposure assumptions used at the time of remedy selection, the extensive vapor intrusion assessment conducted in the last five years has concluded that there is no unacceptable risk to indoor air in fully occupied living or work spaces on any areas of the Site, including the residential Off-Property Study Area. Results for the on-Property buildings sampled showed either no evidence of vapor intrusion or low level vapor intrusion that does not pose an unacceptable health risk. It is recommended, however, that significant changes in Site conditions that may occur in the future, such as a rise in shallow groundwater levels or significant on- or Off-Property development, be reviewed so as to determine whether the vapor intrusion pathway should be reassessed. Regarding 1,4-dioxane, research has shown that this chemical is an emerging contaminant that can be found at sites contaminated by 1,1,1-TCA, which is a Site COC. However, there is no information regarding the presence and distribution of 1,4-dioxane in the subsurface. The remedy at the Intersil Inc,/Siemens Components Superfund Site, including the former Intersil property, former Siemens Property, and Off-Property Study Area, currently protects human health and the environment because all exposure pathways and scenarios are being controlled, including the vapor intrusion pathway. In order for the remedy to be protective in the long-term, additional evaluations of the A Zone in the Off-Property Study Area must be conducted, the groundwater remedy needs to be optimized so as to be more effective, or an alternative remedy selected, and 1,4 dioxane should be analyzed in future site sampling to determine its distribution and whether it should be considered a site COC.`,
    ],
  });
  return embeddings;
}

async function generateResponse() {
  const embeddings = await provideEmbeddings();
  const { text } = await generateText({
    model: openai("gpt-4o"),
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant who is knowledgeable about contaminated waste Superfund sites in the US. You will be provided with embeddings of text written by scientists, and your job is to summarize the key findings in a concise manner readable to regular educated people. You should only pull information from the embeddings.",
      },
    ],
    // embeddings,
  });
  // return response.data.choices[0].message.content;
}

// export async function GET(request) {
//   const text = await generateResponse();
//   return new Response(text);
// }
