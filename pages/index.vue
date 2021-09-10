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

    <div class="grid grid-cols-3 gap-4">
      <cld-video
        v-if="cloudinaryInstance"
        :public-id="cloudinaryInstance.public_id"
        width="500"
        crop="scale"
        quality="auto"
        controls="true"
      />

      <div v-if="transcription" class="col-span-2 flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      cloudinaryInstance: null,
      gcsUrl: null,
      transcription: null,
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
