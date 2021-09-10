<template>
  <div
    class="antialiased font-sans bg-gray-200 h-full w-full min-h-screen p-10"
  >
    <h1
      class="
        p-10
        text-3xl
        leading-10
        font-extrabold
        tracking-tight
        text-gray-900 text-center
      "
    >
      Video Transcript Generator
    </h1>
    <div class="bg-white text-center shadow w-1/2 mx-auto my-10 p-5 rounded-md">
      <p
        class="
          m-5
          max-w-3xl
          mx-auto
          text-md
          leading-normal
          text-gray-500 text-center
        "
      >
        Select a file for upload. The files will be transcribed upto 1 minute.
      </p>
      <form @submit.prevent="process">
        <input
          type="file"
          accept="video/*"
          name="file"
          v-on:change="handleFile"
        />
        <button
          type="submit"
          class="
            block
            my-5
            mx-auto
            items-center
            px-4
            py-2
            border border-transparent
            text-sm
            font-medium
            rounded-md
            shadow-sm
            text-white
            bg-indigo-600
            hover:bg-indigo-700
            focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
          "
        >
          Upload
        </button>
        <p
          class="
            m-5
            max-w-3xl
            mx-auto
            text-md
            leading-normal
            text-black text-center
          "
        >
          {{ step }}
        </p>
      </form>
    </div>

    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="
              shadow
              overflow-hidden
              border-b border-gray-200
              sm:rounded-lg
            "
          >
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    Language
                  </th>
                  <th
                    scope="col"
                    class="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    Confidence
                  </th>
                  <th
                    scope="col"
                    class="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    Text
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(result, index) in transcription.results"
                  :key="index"
                  :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
                >
                  <td class="px-6 py-4 text-sm font-medium text-gray-900">
                    {{ result.languageCode }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ result.alternatives[0].confidence }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ result.alternatives[0].transcript }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      cloudinaryInstance: null,
      gcsUrl: null,
      transcription: {
        results: [
          {
            alternatives: [
              {
                words: [
                  {
                    startTime: { seconds: "2", nanos: 100000000 },
                    endTime: { seconds: "2", nanos: 700000000 },
                    word: "call",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "2", nanos: 700000000 },
                    endTime: { seconds: "3", nanos: 100000000 },
                    word: "Comfort",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "3", nanos: 100000000 },
                    endTime: { seconds: "3", nanos: 300000000 },
                    word: "Inn",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "3", nanos: 300000000 },
                    endTime: { seconds: "10", nanos: 600000000 },
                    word: "South",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "10", nanos: 600000000 },
                    endTime: { seconds: "11", nanos: 200000000 },
                    word: "Africa",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "11", nanos: 200000000 },
                    endTime: { seconds: "14", nanos: 600000000 },
                    word: "small",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "14", nanos: 600000000 },
                    endTime: { seconds: "15", nanos: 100000000 },
                    word: "profit",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "15", nanos: 100000000 },
                    endTime: { seconds: "15", nanos: 800000000 },
                    word: "and",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "15", nanos: 800000000 },
                    endTime: { seconds: "16", nanos: 200000000 },
                    word: "also",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "16", nanos: 200000000 },
                    endTime: { seconds: "16", nanos: 800000000 },
                    word: "received",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "16", nanos: 800000000 },
                    endTime: { seconds: "17", nanos: 500000000 },
                    word: "delivery",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "17", nanos: 500000000 },
                    endTime: { seconds: "17", nanos: 900000000 },
                    word: "of",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "17", nanos: 900000000 },
                    endTime: { seconds: "18", nanos: 600000000 },
                    word: "goods",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "18", nanos: 600000000 },
                    endTime: { seconds: "19", nanos: 0 },
                    word: "within",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "19", nanos: 0 },
                    endTime: { seconds: "19", nanos: 800000000 },
                    word: "24-hours",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "19", nanos: 800000000 },
                    endTime: { seconds: "20", nanos: 400000000 },
                    word: "business",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "20", nanos: 400000000 },
                    endTime: { seconds: "27", nanos: 400000000 },
                    word: "is",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "27", nanos: 400000000 },
                    endTime: { seconds: "27", nanos: 500000000 },
                    word: "on",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "27", nanos: 500000000 },
                    endTime: { seconds: "27", nanos: 600000000 },
                    word: "the",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "27", nanos: 600000000 },
                    endTime: { seconds: "28", nanos: 200000000 },
                    word: "continent",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "28", nanos: 200000000 },
                    endTime: { seconds: "29", nanos: 400000000 },
                    word: "a",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "29", nanos: 400000000 },
                    endTime: { seconds: "29", nanos: 800000000 },
                    word: "little",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "29", nanos: 800000000 },
                    endTime: { seconds: "30", nanos: 100000000 },
                    word: "from",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "30", nanos: 100000000 },
                    endTime: { seconds: "30", nanos: 500000000 },
                    word: "you",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "30", nanos: 500000000 },
                    endTime: { seconds: "40", nanos: 700000000 },
                    word: "guys",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "40", nanos: 700000000 },
                    endTime: { seconds: "41", nanos: 200000000 },
                    word: "up",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "41", nanos: 200000000 },
                    endTime: { seconds: "41", nanos: 800000000 },
                    word: "and",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "41", nanos: 800000000 },
                    endTime: { seconds: "42", nanos: 600000000 },
                    word: "get",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "42", nanos: 600000000 },
                    endTime: { seconds: "42", nanos: 700000000 },
                    word: "it",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "42", nanos: 700000000 },
                    endTime: { seconds: "42", nanos: 900000000 },
                    word: "for",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "42", nanos: 900000000 },
                    endTime: { seconds: "43", nanos: 100000000 },
                    word: "you",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "43", nanos: 100000000 },
                    endTime: { seconds: "59", nanos: 900000000 },
                    word: "because",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "59", nanos: 900000000 },
                    endTime: { seconds: "61", nanos: 500000000 },
                    word: "you",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "61", nanos: 500000000 },
                    endTime: { seconds: "61", nanos: 600000000 },
                    word: "have",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "61", nanos: 600000000 },
                    endTime: { seconds: "61", nanos: 900000000 },
                    word: "a",
                    confidence: 0,
                    speakerTag: 0,
                  },
                ],
                transcript:
                  "call Comfort Inn South Africa small profit and also received delivery of goods within 24-hours business is on the continent a little from you guys up and get it for you because you have a",
                confidence: 0.8344219326972961,
              },
            ],
            channelTag: 0,
            languageCode: "en-us",
          },
          {
            alternatives: [
              {
                words: [
                  {
                    startTime: { seconds: "62", nanos: 100000000 },
                    endTime: { seconds: "66", nanos: 100000000 },
                    word: "cost-push",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "66", nanos: 100000000 },
                    endTime: { seconds: "66", nanos: 400000000 },
                    word: "is",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "66", nanos: 400000000 },
                    endTime: { seconds: "66", nanos: 800000000 },
                    word: "going",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "66", nanos: 800000000 },
                    endTime: { seconds: "67", nanos: 100000000 },
                    word: "forward",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "67", nanos: 100000000 },
                    endTime: { seconds: "67", nanos: 500000000 },
                    word: "and",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "67", nanos: 500000000 },
                    endTime: { seconds: "67", nanos: 800000000 },
                    word: "we",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "67", nanos: 800000000 },
                    endTime: { seconds: "68", nanos: 100000000 },
                    word: "really",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "68", nanos: 100000000 },
                    endTime: { seconds: "68", nanos: 100000000 },
                    word: "want",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "68", nanos: 100000000 },
                    endTime: { seconds: "68", nanos: 400000000 },
                    word: "to",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "68", nanos: 400000000 },
                    endTime: { seconds: "69", nanos: 0 },
                    word: "expand",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "69", nanos: 0 },
                    endTime: { seconds: "69", nanos: 200000000 },
                    word: "quickly",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "69", nanos: 200000000 },
                    endTime: { seconds: "69", nanos: 700000000 },
                    word: "and",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "69", nanos: 700000000 },
                    endTime: { seconds: "70", nanos: 100000000 },
                    word: "skill",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "70", nanos: 100000000 },
                    endTime: { seconds: "70", nanos: 800000000 },
                    word: "between",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "70", nanos: 800000000 },
                    endTime: { seconds: "71", nanos: 0 },
                    word: "the",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "71", nanos: 0 },
                    endTime: { seconds: "71", nanos: 400000000 },
                    word: "spaces",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "71", nanos: 400000000 },
                    endTime: { seconds: "71", nanos: 800000000 },
                    word: "were",
                    confidence: 0,
                    speakerTag: 0,
                  },
                  {
                    startTime: { seconds: "71", nanos: 800000000 },
                    endTime: { seconds: "72", nanos: 700000000 },
                    word: "excited",
                    confidence: 0,
                    speakerTag: 0,
                  },
                ],
                transcript:
                  "cost-push is going forward and we really want to expand quickly and skill between the spaces were excited",
                confidence: 0.7635733485221863,
              },
            ],
            channelTag: 0,
            languageCode: "en-us",
          },
          {
            alternatives: [
              {
                words: [
                  {
                    startTime: { seconds: "2", nanos: 100000000 },
                    endTime: { seconds: "2", nanos: 700000000 },
                    word: "call",
                    confidence: 0,
                    speakerTag: 2,
                  },
                  {
                    startTime: { seconds: "2", nanos: 700000000 },
                    endTime: { seconds: "3", nanos: 100000000 },
                    word: "Comfort",
                    confidence: 0,
                    speakerTag: 2,
                  },
                  {
                    startTime: { seconds: "3", nanos: 100000000 },
                    endTime: { seconds: "3", nanos: 300000000 },
                    word: "Inn",
                    confidence: 0,
                    speakerTag: 2,
                  },
                  {
                    startTime: { seconds: "3", nanos: 300000000 },
                    endTime: { seconds: "10", nanos: 600000000 },
                    word: "South",
                    confidence: 0,
                    speakerTag: 2,
                  },
                  {
                    startTime: { seconds: "10", nanos: 600000000 },
                    endTime: { seconds: "11", nanos: 200000000 },
                    word: "Africa",
                    confidence: 0,
                    speakerTag: 2,
                  },
                  {
                    startTime: { seconds: "11", nanos: 200000000 },
                    endTime: { seconds: "14", nanos: 600000000 },
                    word: "small",
                    confidence: 0,
                    speakerTag: 2,
                  },
                  {
                    startTime: { seconds: "14", nanos: 600000000 },
                    endTime: { seconds: "15", nanos: 100000000 },
                    word: "profit",
                    confidence: 0,
                    speakerTag: 2,
                  },
                  {
                    startTime: { seconds: "15", nanos: 100000000 },
                    endTime: { seconds: "15", nanos: 800000000 },
                    word: "and",
                    confidence: 0,
                    speakerTag: 2,
                  },
                  {
                    startTime: { seconds: "15", nanos: 800000000 },
                    endTime: { seconds: "16", nanos: 200000000 },
                    word: "also",
                    confidence: 0,
                    speakerTag: 2,
                  },
                  {
                    startTime: { seconds: "16", nanos: 200000000 },
                    endTime: { seconds: "16", nanos: 800000000 },
                    word: "received",
                    confidence: 0,
                    speakerTag: 2,
                  },
                  {
                    startTime: { seconds: "16", nanos: 800000000 },
                    endTime: { seconds: "17", nanos: 500000000 },
                    word: "delivery",
                    confidence: 0,
                    speakerTag: 2,
                  },
                  {
                    startTime: { seconds: "17", nanos: 500000000 },
                    endTime: { seconds: "17", nanos: 900000000 },
                    word: "of",
                    confidence: 0,
                    speakerTag: 2,
                  },
                  {
                    startTime: { seconds: "17", nanos: 900000000 },
                    endTime: { seconds: "18", nanos: 600000000 },
                    word: "goods",
                    confidence: 0,
                    speakerTag: 2,
                  },
                  {
                    startTime: { seconds: "18", nanos: 600000000 },
                    endTime: { seconds: "19", nanos: 0 },
                    word: "within",
                    confidence: 0,
                    speakerTag: 2,
                  },
                  {
                    startTime: { seconds: "19", nanos: 0 },
                    endTime: { seconds: "19", nanos: 800000000 },
                    word: "24-hours",
                    confidence: 0,
                    speakerTag: 2,
                  },
                  {
                    startTime: { seconds: "19", nanos: 800000000 },
                    endTime: { seconds: "20", nanos: 400000000 },
                    word: "business",
                    confidence: 0,
                    speakerTag: 2,
                  },
                  {
                    startTime: { seconds: "20", nanos: 400000000 },
                    endTime: { seconds: "27", nanos: 400000000 },
                    word: "is",
                    confidence: 0,
                    speakerTag: 4,
                  },
                  {
                    startTime: { seconds: "27", nanos: 400000000 },
                    endTime: { seconds: "27", nanos: 500000000 },
                    word: "on",
                    confidence: 0,
                    speakerTag: 4,
                  },
                  {
                    startTime: { seconds: "27", nanos: 500000000 },
                    endTime: { seconds: "27", nanos: 600000000 },
                    word: "the",
                    confidence: 0,
                    speakerTag: 4,
                  },
                  {
                    startTime: { seconds: "27", nanos: 600000000 },
                    endTime: { seconds: "28", nanos: 200000000 },
                    word: "continent",
                    confidence: 0,
                    speakerTag: 4,
                  },
                  {
                    startTime: { seconds: "28", nanos: 200000000 },
                    endTime: { seconds: "29", nanos: 400000000 },
                    word: "a",
                    confidence: 0,
                    speakerTag: 4,
                  },
                  {
                    startTime: { seconds: "29", nanos: 400000000 },
                    endTime: { seconds: "29", nanos: 800000000 },
                    word: "little",
                    confidence: 0,
                    speakerTag: 4,
                  },
                  {
                    startTime: { seconds: "29", nanos: 800000000 },
                    endTime: { seconds: "30", nanos: 100000000 },
                    word: "from",
                    confidence: 0,
                    speakerTag: 4,
                  },
                  {
                    startTime: { seconds: "30", nanos: 100000000 },
                    endTime: { seconds: "30", nanos: 500000000 },
                    word: "you",
                    confidence: 0,
                    speakerTag: 2,
                  },
                  {
                    startTime: { seconds: "30", nanos: 500000000 },
                    endTime: { seconds: "40", nanos: 700000000 },
                    word: "guys",
                    confidence: 0,
                    speakerTag: 1,
                  },
                  {
                    startTime: { seconds: "40", nanos: 700000000 },
                    endTime: { seconds: "41", nanos: 200000000 },
                    word: "up",
                    confidence: 0,
                    speakerTag: 1,
                  },
                  {
                    startTime: { seconds: "41", nanos: 200000000 },
                    endTime: { seconds: "41", nanos: 800000000 },
                    word: "and",
                    confidence: 0,
                    speakerTag: 1,
                  },
                  {
                    startTime: { seconds: "41", nanos: 800000000 },
                    endTime: { seconds: "42", nanos: 600000000 },
                    word: "get",
                    confidence: 0,
                    speakerTag: 2,
                  },
                  {
                    startTime: { seconds: "42", nanos: 600000000 },
                    endTime: { seconds: "42", nanos: 700000000 },
                    word: "it",
                    confidence: 0,
                    speakerTag: 2,
                  },
                  {
                    startTime: { seconds: "42", nanos: 700000000 },
                    endTime: { seconds: "42", nanos: 900000000 },
                    word: "for",
                    confidence: 0,
                    speakerTag: 2,
                  },
                  {
                    startTime: { seconds: "42", nanos: 900000000 },
                    endTime: { seconds: "43", nanos: 100000000 },
                    word: "you",
                    confidence: 0,
                    speakerTag: 2,
                  },
                  {
                    startTime: { seconds: "43", nanos: 100000000 },
                    endTime: { seconds: "59", nanos: 900000000 },
                    word: "because",
                    confidence: 0,
                    speakerTag: 4,
                  },
                  {
                    startTime: { seconds: "59", nanos: 900000000 },
                    endTime: { seconds: "61", nanos: 500000000 },
                    word: "you",
                    confidence: 0,
                    speakerTag: 4,
                  },
                  {
                    startTime: { seconds: "61", nanos: 500000000 },
                    endTime: { seconds: "61", nanos: 600000000 },
                    word: "have",
                    confidence: 0,
                    speakerTag: 4,
                  },
                  {
                    startTime: { seconds: "61", nanos: 600000000 },
                    endTime: { seconds: "61", nanos: 900000000 },
                    word: "a",
                    confidence: 0,
                    speakerTag: 4,
                  },
                  {
                    startTime: { seconds: "62", nanos: 100000000 },
                    endTime: { seconds: "66", nanos: 100000000 },
                    word: "cost-push",
                    confidence: 0,
                    speakerTag: 1,
                  },
                  {
                    startTime: { seconds: "66", nanos: 100000000 },
                    endTime: { seconds: "66", nanos: 400000000 },
                    word: "is",
                    confidence: 0,
                    speakerTag: 1,
                  },
                  {
                    startTime: { seconds: "66", nanos: 400000000 },
                    endTime: { seconds: "66", nanos: 800000000 },
                    word: "going",
                    confidence: 0,
                    speakerTag: 1,
                  },
                  {
                    startTime: { seconds: "66", nanos: 800000000 },
                    endTime: { seconds: "67", nanos: 100000000 },
                    word: "forward",
                    confidence: 0,
                    speakerTag: 1,
                  },
                  {
                    startTime: { seconds: "67", nanos: 100000000 },
                    endTime: { seconds: "67", nanos: 500000000 },
                    word: "and",
                    confidence: 0,
                    speakerTag: 1,
                  },
                  {
                    startTime: { seconds: "67", nanos: 500000000 },
                    endTime: { seconds: "67", nanos: 800000000 },
                    word: "we",
                    confidence: 0,
                    speakerTag: 1,
                  },
                  {
                    startTime: { seconds: "67", nanos: 800000000 },
                    endTime: { seconds: "68", nanos: 100000000 },
                    word: "really",
                    confidence: 0,
                    speakerTag: 1,
                  },
                  {
                    startTime: { seconds: "68", nanos: 100000000 },
                    endTime: { seconds: "68", nanos: 100000000 },
                    word: "want",
                    confidence: 0,
                    speakerTag: 1,
                  },
                  {
                    startTime: { seconds: "68", nanos: 100000000 },
                    endTime: { seconds: "68", nanos: 400000000 },
                    word: "to",
                    confidence: 0,
                    speakerTag: 1,
                  },
                  {
                    startTime: { seconds: "68", nanos: 400000000 },
                    endTime: { seconds: "69", nanos: 0 },
                    word: "expand",
                    confidence: 0,
                    speakerTag: 4,
                  },
                  {
                    startTime: { seconds: "69", nanos: 0 },
                    endTime: { seconds: "69", nanos: 200000000 },
                    word: "quickly",
                    confidence: 0,
                    speakerTag: 4,
                  },
                  {
                    startTime: { seconds: "69", nanos: 200000000 },
                    endTime: { seconds: "69", nanos: 700000000 },
                    word: "and",
                    confidence: 0,
                    speakerTag: 4,
                  },
                  {
                    startTime: { seconds: "69", nanos: 700000000 },
                    endTime: { seconds: "70", nanos: 100000000 },
                    word: "skill",
                    confidence: 0,
                    speakerTag: 4,
                  },
                  {
                    startTime: { seconds: "70", nanos: 100000000 },
                    endTime: { seconds: "70", nanos: 800000000 },
                    word: "between",
                    confidence: 0,
                    speakerTag: 4,
                  },
                  {
                    startTime: { seconds: "70", nanos: 800000000 },
                    endTime: { seconds: "71", nanos: 0 },
                    word: "the",
                    confidence: 0,
                    speakerTag: 4,
                  },
                  {
                    startTime: { seconds: "71", nanos: 0 },
                    endTime: { seconds: "71", nanos: 400000000 },
                    word: "spaces",
                    confidence: 0,
                    speakerTag: 4,
                  },
                  {
                    startTime: { seconds: "71", nanos: 400000000 },
                    endTime: { seconds: "71", nanos: 800000000 },
                    word: "were",
                    confidence: 0,
                    speakerTag: 4,
                  },
                  {
                    startTime: { seconds: "71", nanos: 800000000 },
                    endTime: { seconds: "72", nanos: 700000000 },
                    word: "excited",
                    confidence: 0,
                    speakerTag: 4,
                  },
                ],
                transcript: "",
                confidence: 0,
              },
            ],
            channelTag: 0,
            languageCode: "",
          },
        ],
        totalBilledTime: { seconds: "90", nanos: 0 },
      },
      step: "",
    };
  },

  methods: {
    async process() {
      this.step = "Uploading to cloudinary...";
      this.cloudinaryInstance = await this.upload();
      this.step = "Audio conversion and Google Cloud Storage Upload...";
      this.gcsUrl = await this.uploadAudio();
      this.step = "Upload completion...";
      await new Promise((r) => setTimeout(r, 5000));
      this.step = "Generating transcript...";
      this.transcription = await this.transcribe();
      console.log(this.transcription);
      this.step = "Process complete :-)";
      await new Promise((r) => setTimeout(r, 5000));
      this.step = "";
    },

    async handleFile(e) {
      this.file = e.target.files[0];
    },

    async readData(f) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(f);
      });
    },

    async upload() {
      const fileData = await this.readData(this.file);

      return await this.$cloudinary.upload(fileData, {
        upload_preset: "default-preset",
        folder: "nuxtjs-video-transcription",
      });
    },
    async uploadAudio() {
      const url = this.$cloudinary.video
        .url(this.cloudinaryInstance.public_id, {
          format: "mp3",
        })
        .replace("f_auto,q_auto/", "");
      const { gcsUrl } = await this.$axios.$post("/api/gcs-store", { url });
      return gcsUrl;
    },

    async transcribe() {
      return await this.$axios.$post("/api/trascribe", { url: this.gcsUrl });
    },
  },
};
</script>
