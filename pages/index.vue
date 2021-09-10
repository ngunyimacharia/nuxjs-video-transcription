<template>
  <Tutorial />
</template>

<script>
export default {
  mounted() {
    this.transcribe();
  },
  methods: {
    async transcribe() {
      const config = {
        languageCode: "en-US",
        enableWordTimeOffsets: true,
        model: "video",
      };

      const audio = {
        uri: "gs://nuxtjs-video-trascription/mestkweza.mp3",
      };

      const data = {
        config,
        audio,
      };

      const resp = await this.$axios.$post(
        `https://speech.googleapis.com/v1/speech:recognize?key=${process.env.NUXT_ENV_GOOGLE_SPEECH_API_KEY}`,
        data
      );

      console.log(resp);
    },
  },
};
</script>
