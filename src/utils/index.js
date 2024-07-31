import { months } from "@/constants";
import crypto from "crypto";

const utils = {
  getFirstLevelRoute: (path) => {
    if (path === null) return "/";
    const segments = path.split("/").filter(function (segment) {
      return segment !== "";
    });
    if (segments.length > 0) {
      return "/" + segments[0];
    } else {
      return "/";
    }
  },

  getByObjectKeyValue: (array, key, value) => {
    const result = array.filter((obj) => {
      return obj[key] === value;
    });
    return result[0] || "";
  },

  clearDatabaseResult: (data) => {
    const updatedData = JSON.stringify(data, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    );
    return JSON.parse(updatedData);
  },

  convertToYouTubeEmbedUrl: (url) => {
    const videoId = url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}`;
  },

  getIdFromYouTubeUrl: (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  },

  getMonthNames: (month) => {
    const monthSelected = months.filter((mes) => mes.key === parseInt(month));
    return monthSelected.length ? monthSelected[0] : months[0];
  },

  fieldSearch: (list, input, field) => {
    list = list.filter((item) => {
      return item[field]
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .includes(
          input
            .toLowerCase()
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
        );
    });

    return list;
  },

  wildCardSearch: (list, input) => {
    const searchText = (item) => {
      for (const key in item) {
        if (item[key] == null) {
          continue;
        }
        if (item[key].toString().toUpperCase().indexOf(input.toString().toUpperCase()) !== -1) {
          return true;
        }
      }
    };
    list = list.filter((value) => searchText(value));
    return list;
  },

  copyTextToClipboard: async (text) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        // Código específico para o Safari
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      return true;
    } catch (err) {
      console.error("Clipboard API falhou:", err);
      return false;
    }
  },

  encrypt_md5: (text) => crypto.createHash("md5").update(text).digest("hex"),

  getRndInteger: (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  },

  resizeAndConvertToBase64: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const MAX_WIDTH = 200;
          const MAX_HEIGHT = 200;

          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(img, 0, 0, width, height);
          const resizedBase64 = canvas.toDataURL(file.type);
          resolve(resizedBase64);
        };
      };
      reader.onerror = (error) => reject(error);
    });
  },

  isInWebView: () => {
    var userAgent = navigator.userAgent.toLowerCase();
    return userAgent.indexOf("wv") > -1 || userAgent.indexOf("x-webview") > -1;
  },

  disablePullToRefresh: () => {
    if (utils.isInWebView()) {
      document.addEventListener(
        "touchmove",
        function (e) {
          if (window.scrollY === 0) {
            e.preventDefault();
          }
        },
        { passive: false }
      );
    }
  },

  preventScrollDefault: () => {
    if (utils.isInWebView()) {
      document.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });
    }
  },

  utf8Decode: (utf8String) => {
    if (typeof utf8String != "string")
      throw new TypeError("parameter ‘utf8String’ is not a string");

    const unicodeString = utf8String
      .replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, (c) => {
        return String.fromCharCode(
          ((c.charCodeAt(0) & 0x0f) << 12) |
            ((c.charCodeAt(1) & 0x3f) << 6) |
            (c.charCodeAt(2) & 0x3f)
        );
      })
      .replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, (c) => {
        return String.fromCharCode(((c.charCodeAt(0) & 0x1f) << 6) | (c.charCodeAt(1) & 0x3f));
      });
    return unicodeString;
  },

  createImage: (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues
      image.src = url;
    }),

  getCroppedImg: async (imageSrc, crop) => {
    const image = await utils.createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);

    return new Promise((resolve) => {
      canvas.toBlob((file) => {
        resolve(URL.createObjectURL(file));
      }, "image/jpeg");
    });
  },

  getFistLastName: (name) => {
    const firstLastName = name.trim().split(" ");
    if (firstLastName.length === 1) return `${firstLastName.shift()}`;
    return `${firstLastName.shift()} ${firstLastName.pop()}`;
  }
};

export default utils;
