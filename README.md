# (Experimental) Angular Support for Embedding SDK

Currently, the Embedding SDK is optimized for use with React. The current example is created for demonstration purposes and may have issues. This is a prototype and it's **not** recommended for production use. Use at your own risk.

## Development server

To start a local development server, run:

```bash
npm install  
```

```bash
npm run start
```

## Limitations

Currently, all components within the `MetabaseProvider` must be React components. See `app.component.tsx` for an example.  

This means that mixing React and Angular components within the subtree of `MetabaseProvider` is not allowed.  

If you require custom wrappers around SDK components, they must be implemented as React components. See `first.child.component.tsx` for an example.  

