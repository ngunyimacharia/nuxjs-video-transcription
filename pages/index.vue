<template>
  <div>
    <h1>Upload Image</h1>
    <form @submit.prevent="process">
      <input
        type="file"
        accept="video/*"
        name="file"
        v-on:change="handleFile"
      />
      <input type="submit" value="upload" />
    </form>
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
    };
  },

  methods: {
    async process() {
      this.cloudinaryInstance = await this.upload();
      this.gcsUrl = await this.uploadAudio();
      await new Promise((r) => setTimeout(r, 5000));
      this.transcription = await this.transcribe();
      console.log(this.transcription);
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
