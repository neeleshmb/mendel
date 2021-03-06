function isNodeModule(id) {
    return id.indexOf('node_modules') >= 0;
}

module.exports = function generatorNodeModule(bundle, doneBundles) {
    const nodeModules = new Map();
    bundle.entries = nodeModules;

    doneBundles.forEach(doneBundle => {
        const {entries} = doneBundle;

        Array.from(entries.values())
            .filter(({id}) => isNodeModule(id))
            .forEach(entry => {
                // Remove it from main bundle
                entries.delete(entry.id);
                // and add it to the node module bundle;
                nodeModules.set(entry.id, entry);
            });

        Array.from(entries.values())
        .forEach(entry => {
            const {deps} = entry;
            Object.keys(deps)
            .forEach(depLiteral => {
                const dep = entry.deps[depLiteral];
                if (!nodeModules.has(dep)) return;

                const depEntry = nodeModules.get(dep);

                // Only node modules that are being used by main bundle
                // should be expose or "required" in browserify sense.
                // Unncessary but congruent to ManifestV1
                depEntry.expose = depEntry.id;
            });
        });
    });

    return bundle;
};
