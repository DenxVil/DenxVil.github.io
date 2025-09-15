// WebGL capability detection with Safari-specific handling
export function checkWebGLSupport() {
  try {
    const canvas = document.createElement('canvas');
    
    // Safari-specific WebGL context options
    const contextOptions = {
      alpha: true,
      depth: true,
      stencil: true,
      antialias: true,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
      powerPreference: 'default', // Important for Safari compatibility
      failIfMajorPerformanceCaveat: false // Allow software rendering
    };
    
    // Try to get WebGL context with Safari-friendly options
    const context = canvas.getContext('webgl', contextOptions) || 
                   canvas.getContext('experimental-webgl', contextOptions) ||
                   canvas.getContext('webgl2', contextOptions);
    
    if (!context) {
      console.warn('WebGL context creation failed');
      return { supported: false, reason: 'context_creation_failed' };
    }

    // Test basic WebGL functionality
    try {
      const renderer = context.getParameter(context.RENDERER);
      const vendor = context.getParameter(context.VENDOR);
      
      // Basic feature checks (more lenient for Safari)
      const hasRequiredExtensions = context.getExtension('OES_element_index_uint') !== null;
      const hasFloatTextures = context.getExtension('OES_texture_float') !== null;
      
      // Test if we can actually draw something
      context.viewport(0, 0, canvas.width, canvas.height);
      context.clearColor(0, 0, 0, 1);
      context.clear(context.COLOR_BUFFER_BIT);
      
      return {
        supported: true,
        hasExtensions: hasRequiredExtensions,
        hasFloatTextures: hasFloatTextures,
        renderer: renderer,
        vendor: vendor,
        contextType: context.constructor.name
      };
    } catch (drawError) {
      console.warn('WebGL draw test failed:', drawError);
      return { supported: false, reason: 'draw_test_failed', error: drawError.message };
    }
  } catch (error) {
    console.warn('WebGL check failed:', error);
    return { supported: false, reason: 'general_error', error: error.message };
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
  
  // Enhanced Safari detection
  const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent) && !/chromium/.test(userAgent);
  const isMobileSafari = /safari/.test(userAgent) && (isMobile || isTablet);
  const isOldSafari = isSafari && (
    /version\/[1-9]\./.test(userAgent) ||  // Safari 9 and below
    /version\/1[0-2]\./.test(userAgent)    // Safari 10-12 (have WebGL issues)
  );

  return {
    isMobile,
    isTablet,
    isLowEndDevice,
    isSafari,
    isMobileSafari,
    isOldSafari,
    userAgent
  };
}