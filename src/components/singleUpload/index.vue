<template>
    <el-upload
        :ref="`Uploader-${uploadId}`"
        v-loading="loading"
        action="http://atest.voiceseix.com/api/v2/third/resource/batchUploadAndGetFileInformation"
        :style="style"
        :auto-upload="false"
        list-type="picture-card"
        :show-file-list="showFileList"
        :name="uploadId"
        accept="image/*"
        multiple
        :file-list="fileList"
        :before-upload="handleBeforeUpload"
        :http-request="httpRequest"
        :on-change="handleChange"
        :on-remove="handleRemove"
    >
        <i class="el-icon-plus" />
    </el-upload>
</template>
<script>
import { AlluploadImg } from '@/api/operate/marketingAnchor/anchorList/index';
export default {
    name: 'AppImagesUploader',
    model: {
        event: 'upload',
        prop: 'images'
    },
    props: {

        name: { //上传字段的name
            type: [String],
            required: false,
            default: 'file'
        },

        size: { //中间的加号大小
            type: [String],
            required: false,
            default: '28px'
        },
        w: { //宽
            type: [String],
            required: false,
            default: 'auto'
        },
        h: { //高
            type: [String],
            required: false,
            default: 'auto'
        },
        images: { //图片数组
            type: [Array],
            required: false,
            default() {
                return [];
            }
        }

    },
    data() {
        return {
            uploadId: Math.random().toString(36).substr(2).toLocaleUpperCase(),
            loading: false,
            showFileList: false,
            fileList: [],
            fm: new FormData(),
            uploadFiles: [], //待上传的文件列表
            fileTotal: 0 //上传文件总数
        };
    },
    computed: {
        style() {
            const { w, h, size } = this;
            return {
                width: w,
                height: h,
                fontSize: size
            };
        }
    },

    created() {
        this.fileList = this.images.map(url => ({ url }));
    },

    methods: {

        /**
         * 手动上传回调
         */
        async httpRequest(file) {
            this.fm.append(this.name, file.file);
            //当fm getall的数组长度与filetotal的长度一致，就说明万事俱备，就差上传了
            if (this.fm.getAll(this.name).length === this.fileTotal) {
                try {
                    //这里的就是你的上传方法了
                    const { data } = await AlluploadImg(this.fm);
                    console.log(data)
                    //这里是上传成功之后要做的事情
                    if (data.code == 200) {
                        this.showFileList = true;
                        if (this.fileList.length) {
                            for (const index in data.data) {
                                this.fileList.push({ url: data.data[index].url });
                            }
                        } else {
                            this.fileList = data.data.map(item => ({ url:data.data[index].url}));
                        }
                        this.$emit('upload', this.fileList.map(item => item.url));
                    }
                } catch (error) {
                    console.log(`上传文件出错`, error,data.data);
                } finally {
                    //无论成功与失败都要清空文件列表，否则会出现无法上传的情况
                    this.uploadFiles = [];
                    this.fm.delete(this.name);
                    this.loading = false;
                }
            }
        },

        /**
         * 上传前回调
         */
        handleBeforeUpload(file) {
            const isSize = file.size / 1024 / 1024 < 4;
            this.loading = true;
            if (!isSize) {
                this.$_app.message.error('上传图片大小不能超过 4MB!');
            }
            if (!isSize) this.loading = false;
            return isSize;
        },

        /**
         * 文件上传change
         */
        handleChange(file, fileList) {
            //获取添加文件进来的状态
            (file.status == 'ready') && this.uploadFiles.push(file.raw);
            this.showFileList = false;
            //获取原始文件的个数
            this.fileTotal = document.getElementsByName(this.uploadId)[0].files.length;
            //如果原始文件和upload的个数相同的时候就说明已经添加完了，可以触发上传的方法了
            if (this.uploadFiles.length === this.fileTotal) {
                //获取上传文件的组件
                const Uploader = this.$refs[`Uploader-${this.uploadId}`];
                //触发上传文件列表的方法
                Uploader.submit();
            }
        },

        /**
         * 移除图片回调
         */
        handleRemove(file, fileList) {
            const index = this.fileList.findIndex((item) => item.uid == file.uid);
            this.fileList.splice(index, 1);
            this.$emit('upload', this.fileList.map(item => item.url));
        }
    }
};
</script>
<style lang="scss" scoped>
.image-uploader {
  ::deep .el-upload{
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        background: #fff;
        img{
            display: inline-block;
            width: 100%;
        }
    }
}
</style>
