// WebGL capability detection
export function checkWebGLSupport() {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!context) {
      return { supported: false };
    }

    // Basic WebGL feature checks
    const hasRequiredExtensions = context.getExtension('OES_element_index_uint') !== null;
    const hasFloatTextures = context.getExtension('OES_texture_float') !== null;
    
    return {
      supported: true,
      hasExtensions: hasRequiredExtensions,
      hasFloatTextures: hasFloatTextures,
      renderer: context.getParameter(context.RENDERER),
      vendor: context.getParameter(context.VENDOR)
    };
  } catch (error) {
    console.warn('WebGL check failed:', error);
    return { supported: false, error: error.message };
  }
}

export function isWebGLAvailable() {
  const result = checkWebGLSupport();
  return result.supported;
}

export function getDeviceCapabilities() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);
  const isTablet = /ipad|tablet/.test(userAgent);
  const isLowEndDevice = isMobile && (
    /android.+2\.|android.+3\.|android.+4\.0|android.+4\.1/.test(userAgent) ||
    /iphone.+os [3-6]_/.test(userAgent)
  );

  return {
    isMobile,
    isTablet,
    isLowEndDevice,
    userAgent
  };
}